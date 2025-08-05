document.addEventListener('DOMContentLoaded', function() {
    const giftContainer = document.getElementById('giftContainer');
    const giftLid = document.getElementById('giftLid');
    const confettiContainer = document.getElementById('confettiContainer');
    const pageTransition = document.getElementById('pageTransition');
    
    // Add click event to gift box
    giftContainer.addEventListener('click', function() {
        // Hide arrows immediately
        const arrows = document.querySelector('.arrows');
        if (arrows) {
            arrows.style.opacity = '0';
            arrows.style.transform = 'scale(0)';
        }
        
        // Add opening class for gift box and lid animation
        const giftBox = document.querySelector('.gift-box');
        giftBox.classList.add('opening');
        giftLid.classList.add('opening');
        
        // Create immediate confetti and balloons effect
        createConfetti();
        createBalloons();
        
        // Play celebration sound
        playSound();
        
        // Wait for gift box animation to complete, then show transition
        setTimeout(() => {
            // Create final explosion effect
            createFinalExplosion();
            
            // Show page transition after explosion starts
            setTimeout(() => {
                showPageTransition();
            }, 500);
        }, 1000);
    });
    
    // Show page transition animation
    function showPageTransition() {
        pageTransition.classList.add('active');
        
        // Additional transition effects
        createTransitionStars();
        
        // Wait for transition animation to complete, then redirect
        setTimeout(() => {
            // Add fade out effect before redirect
            pageTransition.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)';
            
            setTimeout(() => {
                window.location.href = 'test.html';
            }, 800);
        }, 3000);
    }
    
    // Create stars effect during transition
    function createTransitionStars() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.innerHTML = '✨';
                star.style.position = 'fixed';
                star.style.left = Math.random() * 100 + 'vw';
                star.style.top = Math.random() * 100 + 'vh';
                star.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
                star.style.pointerEvents = 'none';
                star.style.zIndex = '10001';
                star.style.animation = `star-twinkle ${Math.random() * 2 + 1}s ease-in-out infinite`;
                
                document.body.appendChild(star);
                
                setTimeout(() => {
                    if (star.parentNode) {
                        star.parentNode.removeChild(star);
                    }
                }, 3000);
            }, i * 100);
        }
    }
    
    // Create final explosion effect before redirect
    function createFinalExplosion() {
        const colors = ['#ffd700', '#ffb347', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ff69b4', '#9370db'];
        
        // Create massive explosion from gift box center
        const giftBox = document.querySelector('.gift-box');
        const rect = giftBox.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.width = '10px';
                particle.style.height = '10px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                
                const angle = (Math.PI * 2 * i) / 150;
                const velocity = Math.random() * 15 + 10;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                particle.style.animation = `explode-${i} 1.5s ease-out forwards`;
                
                // Create dynamic keyframe animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes explode-${i} {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(${vx * 30}px, ${vy * 30}px) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                    if (style.parentNode) {
                        style.parentNode.removeChild(style);
                    }
                }, 1500);
            }, i * 5);
        }
    }
    
    // Create confetti effect
    function createConfetti() {
        const colors = ['#ffd700', '#ffb347', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                
                confettiContainer.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 100);
        }
    }
    
    // Create balloons effect
    function createBalloons() {
        const balloonColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const balloon = document.createElement('div');
                balloon.className = `balloon ${balloonColors[Math.floor(Math.random() * balloonColors.length)]}`;
                balloon.style.left = Math.random() * 100 + 'vw';
                balloon.style.animationDuration = (Math.random() * 4 + 6) + 's';
                balloon.style.animationDelay = Math.random() * 2 + 's';
                
                document.body.appendChild(balloon);
                
                // Remove balloon after animation
                setTimeout(() => {
                    if (balloon.parentNode) {
                        balloon.parentNode.removeChild(balloon);
                    }
                }, 10000);
            }, i * 200);
        }
    }
    
    // Try to play celebration sound
    function playSound() {
        try {
            // Create audio context for celebration sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create celebration melody
            const celebrationNotes = [
                { freq: 523.25, duration: 0.2 }, // C5
                { freq: 659.25, duration: 0.2 }, // E5
                { freq: 783.99, duration: 0.2 }, // G5
                { freq: 1046.50, duration: 0.4 }, // C6
                { freq: 783.99, duration: 0.2 }, // G5
                { freq: 1046.50, duration: 0.6 }  // C6
            ];
            
            let currentTime = audioContext.currentTime;
            
            celebrationNotes.forEach(note => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(note.freq, currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
                
                oscillator.start(currentTime);
                oscillator.stop(currentTime + note.duration);
                
                currentTime += note.duration;
            });
        } catch (error) {
            console.log('Audio not available');
        }
    }
    
    // Add sparkle effect on mouse move over gift box
    document.addEventListener('mousemove', function(e) {
        const giftBox = document.querySelector('.gift-box');
        if (giftBox) {
            const rect = giftBox.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && 
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                createSparkle(e.clientX, e.clientY);
            }
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '1rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
        sparkle.style.zIndex = '1001';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
    
    // Add CSS for sparkle and star animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle-fade {
            0% {
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
        
        @keyframes star-twinkle {
            0%, 100% {
                opacity: 0.5;
                transform: scale(1) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) rotate(180deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            giftContainer.click();
        }
    });
    
    // Add random heart generation
    function createRandomHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `float ${Math.random() * 3 + 4}s ease-in-out infinite`;
        heart.style.zIndex = '-1';
        heart.style.opacity = '0.7';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 7000);
    }
    
    // Generate random hearts periodically
    setInterval(createRandomHeart, 3000);
    
    // Add love quotes that appear randomly
    const loveQuotes = [
        "รักคุณมากที่สุดในโลก 💕",
        "คุณคือทุกสิ่งของฉัน 💖", 
        "ของขวัญพิเศษสำหรับคุณ 🎁",
        "คุณทำให้ฉันมีความสุขทุกวัน 🌟",
        "วันเกิดที่สวยงามสำหรับคนสวยงาม 🎈"
    ];
    
    function showLoveQuote() {
        const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
        const quoteElement = document.createElement('div');
        quoteElement.textContent = quote;
        quoteElement.style.position = 'fixed';
        quoteElement.style.top = '20px';
        quoteElement.style.left = '50%';
        quoteElement.style.transform = 'translateX(-50%)';
        quoteElement.style.background = 'linear-gradient(135deg, #ffd700, #ffb347)';
        quoteElement.style.color = '#1a1a1a';
        quoteElement.style.padding = '10px 20px';
        quoteElement.style.borderRadius = '20px';
        quoteElement.style.fontSize = '1rem';
        quoteElement.style.zIndex = '1002';
        quoteElement.style.animation = 'fadeInOut 4s ease-in-out';
        quoteElement.style.fontFamily = "'Kanit', sans-serif";
        quoteElement.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.4)';
        quoteElement.style.fontWeight = '500';
        
        document.body.appendChild(quoteElement);
        
        setTimeout(() => {
            if (quoteElement.parentNode) {
                quoteElement.parentNode.removeChild(quoteElement);
            }
        }, 4000);
    }
    
    // Show love quotes periodically
    setInterval(showLoveQuote, 8000);
    
    // Add CSS for quote animation
    const quoteStyle = document.createElement('style');
    quoteStyle.textContent = `
        @keyframes fadeInOut {
            0%, 100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            20%, 80% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(quoteStyle);
});