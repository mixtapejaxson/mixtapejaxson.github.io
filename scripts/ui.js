document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    const currentPagePath = window.location.pathname;

    const navLinks = [
        { text: 'Home', href: 'index.html' },
        { text: 'Projects', href: 'projects/index.html' },
        { text: 'Contact', href: 'contact/index.html' },
        { text: 'About', href: 'about/index.html' }
    ];

    function generateNavLinks() {
        let linksHTML = '';
        const pathDepth = currentPagePath.split('/').length - 2; // -2 to account for the initial empty string and the filename
        const basePath = '../'.repeat(pathDepth > 0 ? pathDepth : 0);

        navLinks.forEach(link => {
            const linkPath = (link.href === 'index.html' && basePath) ? basePath : `${basePath}${link.href}`;
            const isActive = currentPagePath.endsWith(link.href) || (currentPagePath.endsWith('/') && link.href === 'index.html');
            linksHTML += `
                <li class="nav-item">
                    <a href="${linkPath}" class="nav-link ${isActive ? 'active' : ''}">${link.text}</a>
                </li>
            `;
        });
        navMenu.innerHTML = linksHTML;
    }

    if (navMenu) {
        generateNavLinks();
    }

    const footer = document.querySelector('.footer p');

    function generateFooter() {
        const pathDepth = currentPagePath.split('/').length - 2;
        const basePath = '../'.repeat(pathDepth > 0 ? pathDepth : 0);
        const licensePath = `${basePath}LICENSE`;

        footer.innerHTML = `&copy; 2025 MixtapeJaxson. <a href="${licensePath}" target="_blank">MIT</a> License.`;
    }

    if (footer) {
        generateFooter();
    }
});
