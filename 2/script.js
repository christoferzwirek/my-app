document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const body = document.body;
    let currentSectionIndex = 0;
    let isAnimating = false;

    // Przewiń do góry na starcie i ustaw pierwszą sekcję jako aktywną
    window.scrollTo(0, 0);
    sections[currentSectionIndex].classList.add("active");
    body.style.backgroundColor = getComputedStyle(sections[currentSectionIndex]).backgroundColor;

    // Funkcja do przewijania i aktualizacji sekcji
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length || isAnimating) return;
    
        isAnimating = true;
    
        const newColor = getComputedStyle(sections[index]).backgroundColor;
        body.style.backgroundColor = newColor;
    
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    
        // Jeśli sekcja ma zbyt dużo treści, pozwól na naturalne przewijanie
        if (sections[index].scrollHeight > window.innerHeight) {
            sections[index].scrollIntoView({
                behavior: "smooth",
                block: "start", // Wyświetl sekcję od góry
            });
        } else {
            sections[index].scrollIntoView({
                behavior: "smooth",
                block: "center", // Wycentruj sekcję
            });
        }
    
        currentSectionIndex = index;
    
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }
    
    
    // Obsługa przewijania kółkiem myszy
    window.addEventListener("wheel", (event) => {
        if (isAnimating) return;

        if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
            scrollToSection(currentSectionIndex + 1);
        } else if (event.deltaY < 0 && currentSectionIndex > 0) {
            scrollToSection(currentSectionIndex - 1);
        }
    });

    // Obsługa klawiszy strzałek
    window.addEventListener("keydown", (event) => {
        if (isAnimating) return;

        if (event.key === "ArrowDown" && currentSectionIndex < sections.length - 1) {
            scrollToSection(currentSectionIndex + 1);
        } else if (event.key === "ArrowUp" && currentSectionIndex > 0) {
            scrollToSection(currentSectionIndex - 1);
        }
    });

    let touchStartY = 0;
    let touchEndY = 0;

window.addEventListener("touchstart", (event) => {
    touchStartY = event.changedTouches[0].screenY;
});

window.addEventListener("touchend", (event) => {
    touchEndY = event.changedTouches[0].screenY;
    handleGesture();
});

function handleGesture() {
    if (isAnimating) return;

    if (touchStartY > touchEndY + 50 && currentSectionIndex < sections.length - 1) {
        // Przesunięcie w górę (przejdź do następnej sekcji)
        scrollToSection(currentSectionIndex + 1);
    } else if (touchStartY < touchEndY - 50 && currentSectionIndex > 0) {
        // Przesunięcie w dół (przejdź do poprzedniej sekcji)
        scrollToSection(currentSectionIndex - 1);
    }
}

});
