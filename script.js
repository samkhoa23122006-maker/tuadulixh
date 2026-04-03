document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const btnCheckout = document.getElementById('btn-go-checkout');
    const selectedRouteDisplay = document.getElementById('selected-route-display');

    // Hiển thị chuyến đi chọn từ trang chủ (nếu có)
    if (selectedRouteDisplay) {
        const departure = localStorage.getItem('departure') || 'Hà Nội';
        const destination = localStorage.getItem('destination') || 'Hà Giang';
        selectedRouteDisplay.innerText = `Chuyến đi: ${departure} - ${destination}`;
    }

    // 1. TẠO GHẾ (Sửa lỗi image_3c56da.png)
    if (grid) {
        grid.innerHTML = ''; 
        for (let i = 1; i <= 16; i++) {
            const s = document.createElement('div');
            s.className = 'seat';
            s.innerText = 'A' + i;
            s.onclick = function() {
                this.classList.toggle('selected');
                updateSeatInfo();
            };
            grid.appendChild(s);
        }
    }

    // 2. XỬ LÝ THANH TOÁN (Sửa lỗi image_3cbc19.png)
    if (btnCheckout) {
        btnCheckout.onclick = () => {
            const currentSelected = document.querySelectorAll('.seat.selected');
            if (currentSelected.length === 0) {
                alert('Vui lòng chọn ít nhất 1 ghế!');
                return;
            }

            const seatsList = Array.from(currentSelected).map(s => s.innerText);
            
            const departure = localStorage.getItem('departure');
            const destination = localStorage.getItem('destination');
            const savedTrip = localStorage.getItem('selectedTrip');
            let tripName = savedTrip || "Hà Nội - Hà Giang";

            if (departure && destination) {
                tripName = `${departure} - ${destination}`;
                localStorage.setItem('selectedTrip', tripName);
            }
            
            document.getElementById('step-selection').style.display = 'none';
            document.getElementById('step-checkout').style.display = 'block';
            
            document.getElementById('display-trip-name').innerText = tripName;
            document.getElementById('final-seats').innerText = seatsList.join(', ');
            document.getElementById('final-price').innerText = (seatsList.length * 450000).toLocaleString() + 'đ';
        };
    }

    // 3. Lưu thông tin điểm đi/đến từ trang chủ khi tìm chuyến
    const searchRouteBtn = document.getElementById('search-route-btn');
    if (searchRouteBtn) {
        searchRouteBtn.onclick = () => {
            const departureSelect = document.getElementById('departure-select');
            const destinationSelect = document.getElementById('destination-select');
            const dateInput = document.getElementById('trip-date');
            const passengersSelect = document.getElementById('passengers-select');

            if (!departureSelect || !destinationSelect) {
                alert('Thiếu lựa chọn điểm đi hoặc điểm đến.');
                return;
            }

            const departure = departureSelect.value;
            const destination = destinationSelect.value;

            if (departure === destination) {
                alert('Điểm đi và điểm đến phải khác nhau.');
                return;
            }

            localStorage.setItem('departure', departure);
            localStorage.setItem('destination', destination);
            localStorage.setItem('selectedTrip', `${departure} - ${destination}`);

            if (dateInput) {
                localStorage.setItem('tripDate', dateInput.value);
            }
            if (passengersSelect) {
                localStorage.setItem('passengers', passengersSelect.value);
            }

            window.location.href = 'search-results.html';
        };
    }
});

function updateSeatInfo() {
    const selected = document.querySelectorAll('.seat.selected');
    const count = document.getElementById('count');
    if (count) {
        count.innerText = selected.length > 0 ? selected.length + " ghế (" + Array.from(selected).map(s => s.innerText).join(', ') + ")" : "Chưa chọn";
    }
}