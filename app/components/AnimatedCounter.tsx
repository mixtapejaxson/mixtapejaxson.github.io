import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  triggerOnView?: boolean;
}

export default function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  triggerOnView = true
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (triggerOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            startAnimation();
          }
        },
        { threshold: 0.1 }
      );

      if (countRef.current) {
        observer.observe(countRef.current);
      }

      return () => observer.disconnect();
    } else if (!hasStarted) {
      setHasStarted(true);
      startAnimation();
    }
  }, [triggerOnView, hasStarted]);

  const startAnimation = () => {
    const startTime = performance.now();
    const range = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = start + (range * easeOut);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  };

  const formatNumber = (num: number) => {
    return num.toFixed(decimals);
  };

  return (
    <span ref={countRef} className={`tabular-nums ${className}`}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

// Specialized counter components
export function PercentageCounter({
  percentage,
  className = '',
  ...props
}: { percentage: number; className?: string } & Omit<AnimatedCounterProps, 'end' | 'suffix'>) {
  return (
    <AnimatedCounter
      end={percentage}
      suffix="%"
      className={className}
      {...props}
    />
  );
}

export function CurrencyCounter({
  amount,
  currency = '$',
  className = '',
  ...props
}: { amount: number; currency?: string; className?: string } & Omit<AnimatedCounterProps, 'end' | 'prefix'>) {
  return (
    <AnimatedCounter
      end={amount}
      prefix={currency}
      decimals={2}
      className={className}
      {...props}
    />
  );
}

export function LargeNumberCounter({
  number,
  className = '',
  ...props
}: { number: number; className?: string } & Omit<AnimatedCounterProps, 'end' | 'suffix'>) {
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) {
      return { value: num / 1000000, suffix: 'M' };
    } else if (num >= 1000) {
      return { value: num / 1000, suffix: 'K' };
    }
    return { value: num, suffix: '' };
  };

  const { value, suffix } = formatLargeNumber(number);

  return (
    <AnimatedCounter
      end={value}
      suffix={suffix}
      decimals={value < 10 ? 1 : 0}
      className={className}
      {...props}
    />
  );
}
