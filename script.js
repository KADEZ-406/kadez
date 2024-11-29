let productCounter = 1; // Counter untuk kode produk (MD-01, MD-02, ...)

const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable").querySelector("tbody");
const editModal = document.getElementById("editModal");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");

let editIndex = null;

// Tambah Produk
productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil data input
    const productName = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    const productImage = document.getElementById("productImage").value;
    const price = document.getElementById("price").value;
    const unit = document.getElementById("unit").value;
    const stock = parseInt(document.getElementById("stock").value);

    // Tambahkan data ke tabel
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>MD-${String(productCounter).padStart(2, '0')}</td>
        <td>${productName}</td>
        <td>${category}</td>
        <td><img src="${productImage}" alt="${productName}" style="width:50px;height:50px;"></td>
        <td>${price}</td>
        <td>${unit}</td>
        <td class="${stock < 5 ? 'bg-red' : ''}">${stock}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Hapus</button>
        </td>
    `;

    // Event listener untuk edit
    row.querySelector(".edit-btn").addEventListener("click", () => {
        editIndex = row;
        openEditModal(row);
    });

    // Event listener untuk delete
    row.querySelector(".delete-btn").addEventListener("click", () => {
        openDeleteModal(row);
    });

    productTable.appendChild(row);
    productCounter++;
    productForm.reset();
});

// Modal Edit
const openEditModal = (row) => {
    const cells = row.querySelectorAll("td");
    document.getElementById("editProductName").value = cells[1].innerText;
    document.getElementById("editCategory").value = cells[2].innerText;
    document.getElementById("editProductImage").value = cells[3].querySelector("img").src;
    document.getElementById("editPrice").value = cells[4].innerText;
    document.getElementById("editUnit").value = cells[5].innerText;
    document.getElementById("editStock").value = cells[6].innerText;
    editModal.style.display = "flex";
};

document.getElementById("editProductForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const cells = editIndex.querySelectorAll("td");
    cells[1].innerText = document.getElementById("editProductName").value;
    cells[2].innerText = document.getElementById("editCategory").value;
    cells[3].querySelector("img").src = document.getElementById("editProductImage").value;
    cells[4].innerText = document.getElementById("editPrice").value;
    cells[5].innerText = document.getElementById("editUnit").value;
    const stock = parseInt(document.getElementById("editStock").value);
    cells[6].innerText = stock;
    cells[6].className = stock < 5 ? "bg-red" : "";

    editModal.style.display = "none";
});

// Modal Hapus
const openDeleteModal = (row) => {
    deleteConfirmModal.style.display = "flex";

    document.getElementById("confirmDelete").onclick = () => {
        row.remove();
        deleteConfirmModal.style.display = "none";
    };

    document.getElementById("cancelDelete").onclick = () => {
        deleteConfirmModal.style.display = "none";
    };
};

// Tutup modal
document.getElementById("closeModal").onclick = () => {
    editModal.style.display = "none";
};
