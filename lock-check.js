// lock-check.js
// Redirect users to checkout if they don't have an active membership
const isMember = localStorage.getItem("pf_member");

if (!isMember) {
  window.location.href = "checkout.html";
}
