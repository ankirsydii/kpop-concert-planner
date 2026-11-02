const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const imageUpload = document.getElementById('image-upload');
const chatBox = document.getElementById('chat-box');

function appendMessage(sender, text, imageSrc = null) {
    const msgElement = document.createElement('div');
    msgElement.classList.add('message');
    msgElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

    // Jika ada teks, buat elemen teks
    if (text) {
        const textElement = document.createElement('p');
        textElement.textContent = text;
        msgElement.appendChild(textElement);
    }

    // Jika ada gambar yang diunggah user, tampilkan preview fotonya di chat
    if (imageSrc) {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.style.maxWidth = '200px';
        imgElement.style.borderRadius = '8px';
        imgElement.style.marginTop = '8px';
        imgElement.style.display = 'block';
        msgElement.appendChild(imgElement);
    }

    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const textMessage = userInput.value.trim();
    const imageFile = imageUpload.files[0];

    if (!textMessage && !imageFile) return;

    // Buat URL preview lokal untuk gambar yang di-upload
    let imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
    
    // Tampilkan pesan dan preview gambar user di chat box
    appendMessage('user', textMessage, imageUrl);
    
    // Reset input form
    userInput.value = '';
    imageUpload.value = '';

    // Pesan loading sementara dari bot
    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('message', 'bot-message');
    botMessageElement.textContent = 'Lagi bedah seating plan & hitung rincian budget bestie... ✨';
    chatBox.appendChild(botMessageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    const formData = new FormData();
    formData.append('message', textMessage || 'Tolong analisis seating plan dan pricelist tiket ini secara detail ya!');
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            body: formData 
        });

        if (!response.ok) throw new Error('Gagal merespons dari server');

        const data = await response.json();
        
        // Bersihkan seluruh simbol bintang (*) jika masih lolos
        const cleanText = (data.result || 'Maaf, tidak ada respons.').replace(/\*/g, '');
        botMessageElement.textContent = cleanText;
    } catch (error) {
        console.error('Error:', error);
        botMessageElement.textContent = 'Ups, gagal mendapatkan respons dari server.';
    }
});

// Fitur klik Quick Prompts / Tombol Pintasan
document.querySelectorAll('.prompt-chip').forEach(button => {
    button.addEventListener('click', () => {
        const promptText = button.getAttribute('data-text');
        userInput.value = promptText;
        // Otomatis trigger submit form
        chatForm.dispatchEvent(new Event('submit'));
    });
});