// animação simples quando carregar
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section, index) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.6s ease";
        setTimeout(() => {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }, index * 200);
    });
});

// janela do nav aparece quando "scrolla"
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// validação do Formulário
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// função de validação
function validateForm() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    let isValid = true;
    let errorMessage = 'Por favor, preencha os campos obrigatórios: ';
    let requiredFields = [];

    // Requisito 1: Nome
    if (nome === '') {
        isValid = false;
        requiredFields.push('Nome');
    }

    // Requisito 2: E-mail 
    if (email === '') {
        isValid = false;
        requiredFields.push('E-mail');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        isValid = false;
        errorMessage = 'Por favor, insira um E-mail válido.'; 
    }

    // Requisito 3: Mensagem
    if (mensagem === '') {
        isValid = false;
        requiredFields.push('Mensagem');
    }

    // exibe a mensagem de erro ou sucesso
    formMessage.classList.remove('hidden', 'success', 'error');

    if (!isValid) {
        formMessage.classList.add('error');
        if (requiredFields.length > 0) {
            formMessage.textContent = errorMessage + requiredFields.join(', ') + '.';
        } else {
            formMessage.textContent = errorMessage; // exibe erro de formato de e-mail
        }
    } else {
        // simulação de envio de formulário
        formMessage.classList.add('success');
        formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
        
        // limpa o formulário após o envio
        contactForm.reset(); 

        // oculta a mensagem após 5 segundos
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
    
    return isValid;
}

// adiciona o evento de submissão ao formulário
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // impede o envio padrão do formulário
        validateForm();
    });
}