document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Effect
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        // Update glow position
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';

        // Show glow when mouse moves
        cursorGlow.style.opacity = '1';
    });

    // Hide glow when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });


    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    // Basic alert for now, in production this would toggle a class
    mobileBtn.addEventListener('click', () => {
        alert('Menu functionality placeholder');
    });

    // 3. Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade in elements
    const animatedElements = document.querySelectorAll('.feature-card, .hero-text, .cta-box');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 5. Booking Modal Logic
    // Injected Modal HTML
    const modalHTML = `
    <div class="modal-overlay" id="bookingModal">
        <div class="modal-content">
            <button class="modal-close" style="color:white; font-size:2rem; cursor:pointer;">&times;</button>
            <h2 style="margin-bottom: 0.5rem; color: white;">Запись на приём</h2>
            <p style="color: var(--color-text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">Оставьте номер телефона, мы вам перезвоним.</p>
            
            <form id="bookingForm">
                <div class="form-group">
                    <label class="form-label">Ваше имя (необязательно)</label>
                    <input type="text" class="form-input" placeholder="Иван" name="name" style="width: 100%; margin-bottom: 1rem; padding: 10px; border-radius: 8px; border: 1px solid #444; background: #222; color: white;">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Номер телефона</label>
                    <input type="tel" class="form-input" id="phoneInput" placeholder="+7 (999) 999-99-99" required style="width: 100%; margin-bottom: 1.5rem; padding: 10px; border-radius: 8px; border: 1px solid #444; background: #222; color: white;">
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Отправить</button>
            </form>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('bookingModal');
    const closeBtn = modal.querySelector('.modal-close');
    const bookingForm = modal.querySelector('#bookingForm');
    const phoneInput = modal.querySelector('#phoneInput');

    // Open Modal Handlers
    function openModal(e) {
        if (e) e.preventDefault();
        modal.classList.add('active');
        // Simple overlay fade in via class
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        document.body.style.overflow = '';
    }

    // Attach to any button with class 'js-open-modal' or specific booking links
    document.addEventListener('click', (e) => {
        if (e.target.closest('.js-open-modal') || e.target.closest('a[href="#book"]')) {
            openModal(e);
        }
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    closeBtn.addEventListener('click', closeModal);

    // Simple Phone Mask
    phoneInput.addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        if (!x[2]) {
            e.target.value = !x[1] ? '' : (x[1] === '7' || x[1] === '8' ? '+7 (' : '+7 (' + x[1]);
        } else {
            e.target.value = '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        }
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Visual feedback
        const btn = bookingForm.querySelector('button[type="submit"]');
        btn.textContent = 'Отправлено!';
        btn.style.borderColor = '#27c93f';
        btn.style.color = '#27c93f';

        setTimeout(() => {
            closeModal();
            btn.textContent = 'Отправить';
            btn.style.borderColor = '';
            btn.style.color = '';
            bookingForm.reset();
        }, 2000);
    });

});


