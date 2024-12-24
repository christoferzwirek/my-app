document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const body = document.body;
    let currentSectionIndex = 0;
    let isAnimating = false;
    let touchStartY = 0;
    let touchEndY = 0;

    // Ustawienie pierwszej sekcji jako aktywnej
    window.scrollTo(0, 0);
    sections[currentSectionIndex].classList.add("active");
    body.style.backgroundColor = getComputedStyle(sections[currentSectionIndex]).backgroundColor;

    // Funkcja do przewijania do sekcji
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
    
        // Sprawdź, czy sekcja ma więcej treści niż widok
        if (sections[index].scrollHeight > window.innerHeight) {
            sections[index].scrollIntoView({
                behavior: "smooth",
                block: "start", // Przewiń na górę sekcji
            });
        } else {
            // Wyśrodkowanie sekcji na ekranie
            const offset = (window.innerHeight - sections[index].offsetHeight) / 2;
            window.scrollTo({
                top: sections[index].offsetTop - offset,
                behavior: "smooth",
            });
        }
    
        currentSectionIndex = index;
    
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Dopasowanie do animacji w CSS
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


    // Obsługa gestów dotykowych
    window.addEventListener("touchstart", (event) => {
        touchStartY = event.changedTouches[0].clientY;
        handleGesture();
    });

    window.addEventListener("touchend", (event) => {
        touchEndY = event.changedTouches[0].clientY;
        handleGesture();
    });

    // Funkcja obsługi gestów
    function handleGesture() {
        if (isAnimating) return;

        const swipeDistance = touchStartY - touchEndY;

        if (swipeDistance > 50 && currentSectionIndex < sections.length - 1) {
            // Przesunięcie w górę
            scrollToSection(currentSectionIndex + 1);
        } else if (swipeDistance < -50 && currentSectionIndex > 0) {
            // Przesunięcie w dół
            scrollToSection(currentSectionIndex - 1);
        }
    }

});
