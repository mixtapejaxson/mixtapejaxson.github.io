export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

export interface PageView {
  path: string;
  title: string;
  referrer?: string;
  timestamp: number;
}

class Analytics {
  private enabled: boolean = false;
  private debug: boolean = false;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.enabled =
      typeof window !== "undefined" &&
      !window.location.hostname.includes("localhost");
    this.debug =
      typeof window !== "undefined" &&
      window.location.search.includes("debug=analytics");
  }

  // Initialize analytics (can be extended for GA, Plausible, etc.)
  init() {
    if (!this.enabled) {
      this.log("Analytics disabled (localhost or server-side)");
      return;
    }

    // Add your analytics initialization here
    // Example: Google Analytics, Plausible, Mixpanel, etc.
    this.log("Analytics initialized");
  }

  // Track page views
  trackPageView(path: string, title: string, referrer?: string) {
    const pageView: PageView = {
      path,
      title,
      referrer: referrer || document.referrer,
      timestamp: Date.now(),
    };

    this.log("Page view tracked:", pageView);

    if (!this.enabled) return;

    // Add your page view tracking here
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: path });
  }

  // Track custom events
  trackEvent(name: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
    };

    this.events.push(event);
    this.log("Event tracked:", event);

    if (!this.enabled) return;

    // Add your event tracking here
    // Example: gtag('event', name, properties);
  }

  // Track user interactions
  trackClick(element: string, properties?: Record<string, any>) {
    this.trackEvent("click", {
      element,
      ...properties,
    });
  }

  trackFormSubmit(formName: string, properties?: Record<string, any>) {
    this.trackEvent("form_submit", {
      form_name: formName,
      ...properties,
    });
  }

  trackDownload(fileName: string, fileType?: string) {
    this.trackEvent("download", {
      file_name: fileName,
      file_type: fileType,
    });
  }

  trackOutboundLink(url: string, linkText?: string) {
    this.trackEvent("outbound_link_click", {
      url,
      link_text: linkText,
    });
  }

  // Track scroll depth
  trackScrollDepth(percentage: number) {
    if (percentage % 25 === 0) {
      // Track at 25%, 50%, 75%, 100%
      this.trackEvent("scroll_depth", {
        percentage,
      });
    }
  }

  // Track time spent on page
  trackTimeOnPage(timeInSeconds: number) {
    this.trackEvent("time_on_page", {
      duration: timeInSeconds,
    });
  }

  // Performance tracking
  trackPerformance(metric: string, value: number, unit: string = "ms") {
    this.trackEvent("performance_metric", {
      metric,
      value,
      unit,
    });
  }

  // Error tracking
  trackError(error: Error, context?: string) {
    this.trackEvent("javascript_error", {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  // Get all tracked events (for debugging)
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  // Clear events
  clearEvents() {
    this.events = [];
  }

  private log(...args: any[]) {
    if (this.debug) {
      console.log("[Analytics]", ...args);
    }
  }
}

// Create singleton instance
export const analytics = new Analytics();

// React hook for analytics
export function useAnalytics() {
  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackEvent: analytics.trackEvent.bind(analytics),
    trackClick: analytics.trackClick.bind(analytics),
    trackFormSubmit: analytics.trackFormSubmit.bind(analytics),
    trackDownload: analytics.trackDownload.bind(analytics),
    trackOutboundLink: analytics.trackOutboundLink.bind(analytics),
    trackScrollDepth: analytics.trackScrollDepth.bind(analytics),
    trackTimeOnPage: analytics.trackTimeOnPage.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
  };
}

// Utility functions for common tracking scenarios
export function trackLinkClick(event: MouseEvent, linkName?: string) {
  const target = event.target as HTMLElement;
  const href = target.closest("a")?.href;

  if (href) {
    const isOutbound = !href.startsWith(window.location.origin);
    if (isOutbound) {
      analytics.trackOutboundLink(
        href,
        linkName || target.textContent || undefined,
      );
    } else {
      analytics.trackClick(linkName || "internal_link", { href });
    }
  }
}

export function trackButtonClick(
  buttonName: string,
  properties?: Record<string, any>,
) {
  analytics.trackClick(`button_${buttonName}`, properties);
}

export function setupScrollTracking() {
  if (typeof window === "undefined") return;

  let maxScrollDepth = 0;
  const trackScrollDepth = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = Math.round((scrollTop / docHeight) * 100);

    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
      analytics.trackScrollDepth(scrollDepth);
    }
  };

  window.addEventListener("scroll", trackScrollDepth, { passive: true });

  return () => {
    window.removeEventListener("scroll", trackScrollDepth);
  };
}

export function setupTimeOnPageTracking() {
  if (typeof window === "undefined") return;

  const startTime = Date.now();

  const trackTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    analytics.trackTimeOnPage(timeSpent);
  };

  // Track when user leaves the page
  window.addEventListener("beforeunload", trackTimeOnPage);

  // Track periodically for long sessions
  const interval = setInterval(() => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (timeSpent % 300 === 0) {
      // Every 5 minutes
      analytics.trackTimeOnPage(timeSpent);
    }
  }, 1000);

  return () => {
    window.removeEventListener("beforeunload", trackTimeOnPage);
    clearInterval(interval);
  };
}

export function setupPerformanceTracking() {
  if (typeof window === "undefined" || !window.performance) return;

  // Track Core Web Vitals
  const trackWebVitals = () => {
    // First Contentful Paint
    const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0];
    if (fcpEntry) {
      analytics.trackPerformance(
        "first_contentful_paint",
        Math.round(fcpEntry.startTime),
      );
    }

    // Largest Contentful Paint
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        analytics.trackPerformance(
          "largest_contentful_paint",
          Math.round(lastEntry.startTime),
        );
      });

      try {
        observer.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        // LCP not supported
      }
    }

    // Navigation timing
    setTimeout(() => {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        analytics.trackPerformance(
          "dom_content_loaded",
          Math.round(
            navigation.domContentLoadedEventEnd - navigation.fetchStart,
          ),
        );
        analytics.trackPerformance(
          "load_complete",
          Math.round(navigation.loadEventEnd - navigation.fetchStart),
        );
      }
    }, 0);
  };

  // Run after page load
  if (document.readyState === "complete") {
    trackWebVitals();
  } else {
    window.addEventListener("load", trackWebVitals);
  }
}

// Initialize analytics when module is imported
analytics.init();
