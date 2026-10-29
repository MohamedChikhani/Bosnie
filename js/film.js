const filmDuration = 120_000;
const sceneDuration = filmDuration / 5;
const scenes = [...document.querySelectorAll(".film-scene, .end-card")];
const progress = document.querySelector("#film-progress");
const filmTime = document.querySelector("#film-time");

let startedAt;
let filmClock;

function showScene(index) {
    scenes[index].scrollIntoView({ behavior: "smooth", block: "start" });
    scenes.forEach((scene, sceneIndex) => {
        scene.classList.toggle("is-current", sceneIndex === index);
    });
}

function updateFilmTime() {
    const now = performance.now();
    const elapsed = Math.min(now - startedAt, filmDuration);
    const seconds = Math.floor(elapsed / 1000);
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const remainingSeconds = String(seconds % 60).padStart(2, "0");

    progress.style.width = `${(elapsed / filmDuration) * 100}%`;
    filmTime.textContent = `FILM · ${minutes}:${remainingSeconds} / 02:00`;

    if (elapsed >= filmDuration) {
        filmTime.textContent = "FILM · 02:00 / 02:00";
        window.clearInterval(filmClock);
    }
}

function startFilm() {
    startedAt = performance.now();
    showScene(0);
    updateFilmTime();
    filmClock = window.setInterval(updateFilmTime, 1000);

    scenes.forEach((scene, index) => {
        if (index === 0) return;

        window.setTimeout(() => {
            showScene(index);
        }, sceneDuration * index);
    });
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelector(".film-status").hidden = true;
} else {
    window.addEventListener("load", startFilm, { once: true });
}
