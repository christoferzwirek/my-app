document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    let currentSectionIndex = 0;
    let isAnimating = false;

    // Funkcja do przewijania i aktualizacji sekcji
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length || isAnimating) return;

        isAnimating = true;

        // Zmień kolor tła od razu
        document.body.style.backgroundColor = getComputedStyle(sections[index]).backgroundColor;

        // Ustaw aktywność sekcji
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        // Przewiń do nowej sekcji
        sections[index].scrollIntoView({ behavior: "smooth" });
        currentSectionIndex = index;

        // Zablokuj przewijanie do zakończenia animacji
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Dopasowany do czasu trwania animacji w CSS
    }

    // Ustawienie pierwszej sekcji jako aktywnej podczas ładowania strony
    sections[currentSectionIndex].classList.add("active");
    document.body.style.backgroundColor = getComputedStyle(sections[currentSectionIndex]).backgroundColor;

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
