
const state = { cart: [], logged: false };
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function money(value) {
	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
}

function renderCart() {
	const box = $("#cartItems");
	const count = $("#cartCount");
	const total = $("#cartTotal");

	count.textContent = state.cart.reduce((sum, item) => sum + item.qty, 0);

	if (!state.cart.length) {
		box.innerHTML = '<div style="text-align:center;color:#888;padding:50px 10px">Seu carrinho está vazio.</div>';
		total.textContent = money(0);
		return;
	}

	box.innerHTML = state.cart
		.map(
			(item) => `
				<div class="cart-item">
					<img src="${item.image}">
					<div>
						<h4>${item.name}</h4>
						<small>${money(item.price)}</small>
						<div class="qty">
							<button data-minus="${item.id}">−</button>
							${item.qty}
							<button data-plus="${item.id}">+</button>
						</div>
					</div>
					<b>${money(item.price * item.qty)}</b>
				</div>
			`,
		)
		.join("");

	total.textContent = money(
		state.cart.reduce((sum, item) => sum + item.price * item.qty, 0),
	);
}

function add(id) {
	const product = PRODUCTS.find((item) => item.id == id);
	const cartItem = state.cart.find((item) => item.id == id);

	if (cartItem) {
		cartItem.qty++;
	} else {
		state.cart.push({ ...product, qty: 1 });
	}

	renderCart();
}

$(".add").forEach((button) => {
	button.onclick = () => add(button.dataset.id);
});

$("#cartBtn").onclick = () => {
	$("#cartPanel").classList.add("open");
	$("#overlay").classList.add("show");
};

function closeCart() {
	$("#cartPanel").classList.remove("open");
	$("#overlay").classList.remove("show");
}

$("#closeCart").onclick = closeCart;
$("#overlay").onclick = closeCart;

document.addEventListener("click", (event) => {
	if (event.target.dataset.plus) {
		const item = state.cart.find(
			(cartItem) => cartItem.id == event.target.dataset.plus,
		);
		item.qty++;
		renderCart();
	}

	if (event.target.dataset.minus) {
		const item = state.cart.find(
			(cartItem) => cartItem.id == event.target.dataset.minus,
		);
		item.qty--;

		if (item.qty <= 0) {
			state.cart = state.cart.filter(
				(cartItem) => cartItem.id != event.target.dataset.minus,
			);
		}

		renderCart();
	}
});

$("[data-open]").forEach((button) => {
	button.onclick = () => $("#" + button.dataset.open).classList.add("show");
});

$("[data-close]").forEach((button) => {
	button.onclick = () => button.closest(".modal").classList.remove("show");
});

$("#loginForm").onsubmit = (event) => {
	event.preventDefault();
	state.logged = true;
	$("#loginModal").classList.remove("show");
	alert("Login realizado. Em produção, o carrinho poderá ser persistido no banco.");
};

$("#checkoutBtn").onclick = () => {
	if (!state.logged) {
		closeCart();
		$("#loginModal").classList.add("show");
		return;
	}

	alert("Checkout liberado para usuário autenticado.");
};

function filter() {
	const query = $("#searchInput").value.toLowerCase();
	const category = $(".cat.active").dataset.category;

	$(".product").forEach((product) => {
		product.style.display =
			product.dataset.name.includes(query) &&
			(category === "Todos" || product.dataset.category === category)
				? ""
				: "none";
	});
}

$("#searchForm").onsubmit = (event) => {
	event.preventDefault();
	filter();
};

$("#searchInput").oninput = filter;

$(".cat").forEach((button) => {
	button.onclick = () => {
		$$(".cat").forEach((category) => category.classList.remove("active"));
		button.classList.add("active");
		filter();
	};
});

$("#sort").onchange = (event) => {
	const products = $$(".product-grid .product");

	products.sort((first, second) => {
		if (event.target.value === "low") {
			return first.dataset.price - second.dataset.price;
		}

		if (event.target.value === "high") {
			return second.dataset.price - first.dataset.price;
		}

		return 0;
	});

	products.forEach((product) => $("#productGrid").appendChild(product));
};

renderCart();