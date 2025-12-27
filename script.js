document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const signInBtn = document.getElementById('signInBtn');
    const closeModal = document.getElementById('closeModal');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const showPassword = document.getElementById('showPassword');
    const passwordInput = document.getElementById('password');
    const createAccountBtn = document.getElementById('createAccountBtn');
    const signupLink = document.getElementById('signupLink');
    const successMessage = document.getElementById('successMessage');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Demo credentials
    const demoCredentials = [
        { username: 'demo@x.com', password: 'password123' },
        { username: 'testuser', password: 'test123' },
        { username: 'admin', password: 'admin123' }
    ];

    // Show/Hide Password
    showPassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="far fa-eye"></i>' : '<i class="far fa-eye-slash"></i>';
    });

    // Open Login Modal
    signInBtn.addEventListener('click', function() {
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close Modal
    closeModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.style.display === 'flex') {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle Login Form Submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validation
        if (!username || !password) {
            showError('Please fill in all fields');
            return;
        }
        
        // Check against demo credentials
        const isValid = demoCredentials.some(cred => 
            (cred.username === username && cred.password === password)
        );
        
        if (isValid) {
            // Show success message
            successMessage.style.display = 'flex';
            
            // Close modal
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form
            loginForm.reset();
            passwordInput.type = 'password';
            showPassword.innerHTML = '<i class="far fa-eye"></i>';
            
            // Simulate redirect after 2 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                alert('Redirecting to X feed... (In a real app, this would redirect to dashboard)');
                // In a real app: window.location.href = '/dashboard';
            }, 2000);
        } else {
            showError('Invalid username or password. Try: demo@x.com / password123');
        }
    });

    // Forgot Password (demo)
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset email would be sent. This is a demo.');
    });

    // Sign up link in modal
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        alert('Sign up form would open here');
    });

    // Create Account Button
    createAccountBtn.addEventListener('click', function() {
        alert('Account creation form would open. This demo focuses on login functionality.');
    });

    // Modal button actions
    document.querySelectorAll('.btn-google-modal, .btn-apple-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.textContent.includes('Google') ? 'Google' : 'Apple';
            alert(`${provider} OAuth login would open here`);
        });
    });

    // Show error function
    function showError(message) {
        // Remove any existing error
        const existingError = document.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Create error element
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        errorEl.style.cssText = `
            background-color: #420e0e;
            color: #f4212e;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 15px;
            border: 1px solid #f4212e;
        `;
        
        // Insert before form
        loginForm.parentNode.insertBefore(errorEl, loginForm);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorEl.parentNode) {
                errorEl.parentNode.removeChild(errorEl);
            }
        }, 5000);
    }

    // Ripple effect for all buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Only create ripple if button doesn't have specific action
            if (!this.closest('.modal')) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .modal {
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .input-group input:focus {
            box-shadow: 0 0 0 2px rgba(29, 155, 240, 0.3);
        }
    `;
    document.head.appendChild(style);
});
