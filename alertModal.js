const modal = document.getElementById("customModal");
const span = document.getElementById("closeModal");

function showModal(message) {
    if (!modal) {
        console.error("Modal not found in the document.");
        return;
    }
    document.getElementById("modalMessage").textContent = message;
    modal.style.display = "block";
}

document.addEventListener('DOMContentLoaded', function() {
    if (!modal || !span) {
        console.error("Modal or span not found in the document.");
        return;
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});

export { showModal };
