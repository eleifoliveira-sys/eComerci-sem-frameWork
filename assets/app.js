const state={cart:[],logged:false};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function money(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function renderCart(){
 const box=$("#cartItems"), count=$("#cartCount"), total=$("#cartTotal");
 count.textContent=state.cart.reduce((a,i)=>a+i.qty,0);
 if(!state.cart.length){box.innerHTML='<div style="text-align:center;color:#888;padding:50px 10px">Seu carrinho está vazio.</div>';total.textContent=money(0);return}
 box.innerHTML=state.cart.map(i=>`<div class="cart-item"><img src="${i.image}"><div><h4>${i.name}</h4><small>${money(i.price)}</small><div class="qty"><button data-minus="${i.id}">−</button>${i.qty}<button data-plus="${i.id}">+</button></div></div><b>${money(i.price*i.qty)}</b></div>`).join("");
 total.textContent=money(state.cart.reduce((a,i)=>a+i.price*i.qty,0));
}
function add(id){let p=PRODUCTS.find(x=>x.id==id),i=state.cart.find(x=>x.id==id);i?i.qty++:state.cart.push({...p,qty:1});renderCart()}
$$(".add").forEach(b=>b.onclick=()=>add(b.dataset.id));
$("#cartBtn").onclick=()=>{$("#cartPanel").classList.add("open");$("#overlay").classList.add("show")};
function closeCart(){$("#cartPanel").classList.remove("open");$("#overlay").classList.remove("show")}
$("#closeCart").onclick=closeCart;$("#overlay").onclick=closeCart;
document.addEventListener("click",e=>{if(e.target.dataset.plus){let i=state.cart.find(x=>x.id==e.target.dataset.plus);i.qty++;renderCart()}if(e.target.dataset.minus){let i=state.cart.find(x=>x.id==e.target.dataset.minus);i.qty--;if(i.qty<=0)state.cart=state.cart.filter(x=>x.id!=e.target.dataset.minus);renderCart()}});
$$("[data-open]").forEach(b=>b.onclick=()=>$("#"+b.dataset.open).classList.add("show"));
$$("[data-close]").forEach(b=>b.onclick=()=>b.closest(".modal").classList.remove("show"));
$("#loginForm").onsubmit=e=>{e.preventDefault();state.logged=true;$("#loginModal").classList.remove("show");alert("Login realizado. Em produção, o carrinho poderá ser persistido no banco.");};
$("#checkoutBtn").onclick=()=>{if(!state.logged){closeCart();$("#loginModal").classList.add("show");return}alert("Checkout liberado para usuário autenticado.");};
function filter(){let q=$("#searchInput").value.toLowerCase(),cat=$(".cat.active").dataset.category;$$(".product").forEach(p=>p.style.display=(p.dataset.name.includes(q)&&(cat==="Todos"||p.dataset.category===cat))?"":"none")}
$("#searchForm").onsubmit=e=>{e.preventDefault();filter()};
$("#searchInput").oninput=filter;
$$(".cat").forEach(b=>b.onclick=()=>{$$(".cat").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter()});
$("#sort").onchange=e=>{let arr=$$(".product-grid .product");arr.sort((a,b)=>e.target.value==="low"?a.dataset.price-b.dataset.price:e.target.value==="high"?b.dataset.price-a.dataset.price:0);arr.forEach(x=>$("#productGrid").appendChild(x))};
renderCart();