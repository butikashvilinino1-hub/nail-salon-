/**
 * Tiffany Nail Bar - Interactive JavaScript Application
 * Handles bookings, branch selection, price calculator, gallery filters, and UI animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 2. Booking Modal Logic
    const bookingModal = document.getElementById('booking-modal');
    const openBookingBtns = document.querySelectorAll('.open-booking-modal');
    const closeBookingBtn = document.getElementById('close-booking-modal');
    const bookingForm = document.getElementById('booking-form');
    const bookingSuccessToast = document.getElementById('booking-success-toast');

    function openModal(defaultBranch = '') {
        if (!bookingModal) return;
        bookingModal.classList.remove('hidden');
        bookingModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        if (defaultBranch) {
            const branchSelect = document.getElementById('modal-branch-select');
            if (branchSelect) branchSelect.value = defaultBranch;
        }
    }

    function closeModal() {
        if (!bookingModal) return;
        bookingModal.classList.add('hidden');
        bookingModal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    openBookingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const branch = btn.getAttribute('data-branch') || '';
            openModal(branch);
        });
    });

    if (closeBookingBtn) {
        closeBookingBtn.addEventListener('click', closeModal);
    }

    // Close when clicking modal backdrop
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });
    }

    // 3. Booking Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('modal-client-name')?.value || '';
            const phone = document.getElementById('modal-client-phone')?.value || '';
            const branch = document.getElementById('modal-branch-select')?.value || '';
            const service = document.getElementById('modal-service-select')?.value || '';
            const date = document.getElementById('modal-date')?.value || '';
            const time = document.getElementById('modal-time')?.value || '';

            closeModal();
            showToast(`მადლობა ${name}! თქვენი ჯავშანი ფილიალში (${branch}) ${date} ${time}-ზე წარმატებით გაიგზავნა.`);
            bookingForm.reset();
        });
    }

    // Toast Notification helper
    function showToast(message) {
        if (!bookingSuccessToast) return;
        const toastMsg = document.getElementById('toast-message');
        if (toastMsg) toastMsg.textContent = message;
        
        bookingSuccessToast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
        bookingSuccessToast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
            bookingSuccessToast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
            bookingSuccessToast.classList.remove('translate-y-0', 'opacity-100');
        }, 5500);
    }

    // 4. Interactive Price Calculator
    const serviceCheckboxes = document.querySelectorAll('.calculator-service');
    const calcTotalPrice = document.getElementById('calc-total-price');
    const calcTotalTime = document.getElementById('calc-total-time');

    function updateCalculator() {
        let total = 0;
        let time = 0;

        serviceCheckboxes.forEach(cb => {
            if (cb.checked) {
                total += parseInt(cb.getAttribute('data-price') || '0', 10);
                time += parseInt(cb.getAttribute('data-time') || '0', 10);
            }
        });

        if (calcTotalPrice) {
            calcTotalPrice.textContent = total + ' ₾';
        }
        if (calcTotalTime) {
            calcTotalTime.textContent = time > 0 ? `~${time} წთ` : '0 წთ';
        }
    }

    serviceCheckboxes.forEach(cb => {
        cb.addEventListener('change', updateCalculator);
    });
    updateCalculator(); // Initial calculation

    // 5. Gallery Filter Tabs
    const galleryTabs = document.querySelectorAll('.gallery-tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');

            // Set active class
            galleryTabs.forEach(t => {
                t.classList.remove('bg-tiffany-500', 'text-white', 'shadow-md');
                t.classList.add('bg-white', 'text-gray-600');
            });
            tab.classList.remove('bg-white', 'text-gray-600');
            tab.classList.add('bg-tiffany-500', 'text-white', 'shadow-md');

            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.add('animate-fadeIn');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 6. Header Scroll Effect
    const siteHeader = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader?.classList.add('scrolled');
        } else {
            siteHeader?.classList.remove('scrolled');
        }
    });

    // 7. Branch selector in Cards
    const branchCards = document.querySelectorAll('.branch-card');
    branchCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            branchCards.forEach(c => c.classList.remove('branch-active'));
            card.classList.add('branch-active');
        });
    });
});
