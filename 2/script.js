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

        // Ustaw kolor tła na nowy
        const newColor = getComputedStyle(sections[index]).backgroundColor;
        body.style.backgroundColor = newColor;

        // Dodaj klasę .active dla nowej sekcji, usuń z pozostałych
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        // Przewiń na środek nowej sekcji
        sections[index].scrollIntoView({
            behavior: "smooth",
            block: "center", // Ustawia sekcję w środku ekranu
        });

        currentSectionIndex = index;

        // Odblokuj animację po zakończeniu
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Czas dopasowany do CSS
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
});
