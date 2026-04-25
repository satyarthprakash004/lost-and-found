const itemForm = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
const submitBtn = document.getElementById('submitBtn');

let currentFilter = 'all';

// Load items on startup
document.addEventListener('DOMContentLoaded', fetchItems);

// Handle form submission
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        itemname: document.getElementById('itemname').value,
        type: document.getElementById('type').value,
        email: document.getElementById('email').value,
        lostaddress: document.getElementById('lostaddress').value,
        description: document.getElementById('description').value
    };

    submitBtn.disabled = true;
    submitBtn.innerText = 'Posting...';

    try {
        const response = await fetch('/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(data.matchFound ? 'Match Found! An email has been sent.' : 'Item posted successfully!');
            itemForm.reset();
            fetchItems();
        } else {
            alert('Error: ' + data.error);
        }
    } catch (err) {
        alert('Failed to connect to server');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Post Report';
    }
});

async function fetchItems() {
    try {
        const response = await fetch('/items');
        const items = await response.json();
        renderItems(items);
    } catch (err) {
        itemList.innerHTML = '<p style="color: red;">Error loading items.</p>';
    }
}

function renderItems(items) {
    const filtered = currentFilter === 'all' 
        ? items 
        : items.filter(i => i.type === currentFilter);

    if (filtered.length === 0) {
        itemList.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No items found.</p>';
        return;
    }

    itemList.innerHTML = filtered.map(item => `
        <div class="item-card ${item.type} ${item.status === 'claimed' ? 'status-claimed' : ''}">
            <div class="item-info">
                <h3>${item.itemname}</h3>
                <p>📍 ${item.lostaddress}</p>
                <p>${item.description}</p>
                <p style="font-size: 0.7rem; margin-top: 5px;">${new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
            <div style="text-align: right;">
                <span class="badge badge-${item.type}">${item.type}</span>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 5px;">${item.status}</p>
            </div>
        </div>
    `).join('');
}

function filterItems(filter) {
    currentFilter = filter;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === filter) btn.classList.add('active');
    });
    
    fetchItems();
}
