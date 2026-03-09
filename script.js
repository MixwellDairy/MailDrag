lucide.createIcons();

// --- Start Modal & Templates Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const startModal = document.getElementById('start-modal');
    
    document.getElementById('start-scratch-btn').addEventListener('click', () => {
        startModal.classList.add('opacity-0');
        setTimeout(() => startModal.classList.add('hidden'), 300);
        saveState();
    });

    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            startModal.classList.add('opacity-0');
            setTimeout(() => startModal.classList.add('hidden'), 300);
            loadTemplate(e.currentTarget.dataset.template);
        });
    });
});

function addBlock(type, customizerFn) {
    const block = createBlockWrapper(type);
    if (customizerFn) customizerFn(block);
    canvas.appendChild(block);
    lucide.createIcons({ root: block });
}

function loadTemplate(type) {
    canvas.innerHTML = '';
    let themeName = 'light';

    switch(type) {
        case 'promo':
            themeName = 'light';
            addBlock('logo');
            addBlock('hero', b => {
                b.querySelector('h1').innerText = 'Spring Sale is Here!';
                b.querySelector('.promo-box span:last-child').innerText = 'SPRING20';
            });
            addBlock('text', b => b.querySelector('p').innerText = 'Get 20% off all items in our new spring collection. Limited time only!');
            addBlock('columns', b => {
                const imgs = b.querySelectorAll('img');
                imgs[0].src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=300&auto=format&fit=crop';
                imgs[1].src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop';
            });
            addBlock('coupon', b => {
                b.querySelector('div:first-child').innerText = 'USE CODE AT CHECKOUT';
                b.querySelector('div:last-child').innerText = 'SPRING20';
            });
            addBlock('button', b => b.querySelector('a').innerText = 'Shop the Sale');
            addBlock('social'); 
            addBlock('footer'); 
            break;
            
        case 'newsletter': 
            themeName = 'corporate'; 
            addBlock('logo');
            addBlock('banner', b => b.querySelector('span').innerText = 'Industry Weekly Digest'); 
            addBlock('heading', b => b.querySelector('h2').innerText = 'This Week in Tech');
            addBlock('text', b => b.querySelector('p').innerText = 'Welcome to this week\'s roundup of the most important news and insights from the tech industry.');
            addBlock('article', b => { 
                b.querySelector('img').src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop'; 
                b.querySelector('h3').innerText = 'AI Breakthroughs in 2024'; 
                b.querySelector('p').innerText = 'Discover how the latest machine learning models are changing the landscape of software development.'; 
            });
            addBlock('divider'); 
            addBlock('article', b => { 
                b.querySelector('img').src = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop'; 
                b.querySelector('h3').innerText = 'The Future of Remote Work'; 
                b.querySelector('p').innerText = 'A new study shows hybrid models are becoming the standard for major corporations worldwide.'; 
            });
            addBlock('social'); 
            addBlock('footer'); 
            break;
            
        case 'welcome': 
            themeName = 'playful'; 
            addBlock('logo'); 
            addBlock('heading', b => { 
                const h2 = b.querySelector('h2'); 
                h2.innerText = 'Welcome aboard! 👋'; 
                h2.style.fontSize = '32px'; 
                b.querySelector('.content-element').style.textAlign = 'center'; 
            });
            addBlock('text', b => { 
                b.querySelector('p').innerText = 'We are so excited to have you join our community. Here are a few things you can do to get started right away:'; 
                b.querySelector('.content-element').style.textAlign = 'center'; 
            });
            addBlock('list', b => { 
                b.querySelector('ul').innerHTML = '<li>Complete your user profile</li><li>Explore our comprehensive documentation</li><li>Join our community Discord server</li>'; 
            }); 
            addBlock('spacer');
            addBlock('button', b => { 
                b.querySelector('a').innerText = 'Complete Your Profile'; 
                b.querySelector('.content-element').style.textAlign = 'center'; 
            }); 
            addBlock('badges'); 
            addBlock('footer'); 
            break;
            
        case 'event': 
            themeName = 'elegant'; 
            addBlock('logo'); 
            addBlock('image', b => b.querySelector('img').src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop');
            addBlock('heading', b => { 
                b.querySelector('h2').innerText = 'You are invited.'; 
                b.querySelector('.content-element').style.textAlign = 'center'; 
            });
            addBlock('text', b => { 
                b.querySelector('p').innerText = 'Join us for an exclusive evening of networking, keynote speakers, and industry insights at our annual gala.'; 
                b.querySelector('.content-element').style.textAlign = 'center'; 
            });
            addBlock('columns', b => { 
                const textEls = b.querySelectorAll('h3'); 
                textEls[0].innerText = 'Date & Time'; 
                b.querySelectorAll('p')[0].innerText = 'October 24, 2024\n7:00 PM - 11:00 PM'; 
                textEls[1].innerText = 'Location'; 
                b.querySelectorAll('p')[1].innerText = 'The Grand Hotel\n123 Luxury Ave, NY'; 
                b.querySelectorAll('img').forEach(img => img.style.display = 'none'); 
            });
            addBlock('button', b => { 
                b.querySelector('a').innerText = 'RSVP Now'; 
                b.querySelector('.content-element').style.textAlign = 'center'; 
            }); 
            addBlock('spacer'); 
            addBlock('footer'); 
            break; 
    } 
    document.getElementById('theme-selector').value = themeName; 
    checkEmptyState();
    saveState(); 
    applyTheme(themeName); 
} 

// --- Accordion Logic --- 
document.querySelectorAll('.accordion-btn').forEach(btn => { 
    btn.addEventListener('click', () => { 
        const content = btn.nextElementSibling; 
        const isActive = btn.classList.contains('active'); 
        if (!isActive) { 
            btn.classList.add('active'); 
            content.classList.add('mt-2'); 
            content.style.maxHeight = content.scrollHeight + 'px'; 
            content.style.opacity = '1'; 
        } else { 
            btn.classList.remove('active'); 
            content.style.maxHeight = '0px'; 
            content.style.opacity = '0'; 
            content.classList.remove('mt-2'); 
        } 
    }); 
});

// Init accordions 
document.querySelectorAll('.accordion-btn.active').forEach(btn => { 
    const content = btn.nextElementSibling; 
    content.style.maxHeight = content.scrollHeight + 'px'; 
});

// --- State Management & History --- 
let draggedElement = null; 
let selectedElement = null; 
let isPreviewMode = false;

let historyStack = []; 
let historyIndex = -1; 
const MAX_HISTORY = 30;

// * Add your remaining JS structure here (i.e. drag and drop, state, export) *
