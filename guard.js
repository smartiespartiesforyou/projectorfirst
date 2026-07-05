/*
 * guard.js — ProjectorFirst membership gate (DRAFT FOR REVIEW — not deployed)
 * ---------------------------------------------------------------------------
 * Purpose: protect a game page so only members with an active plan can play.
 *
 * Based on the proven gate already running on apps.html, with two fixes:
 *   1. Trial-expiry loophole closed (plans must be in good standing;
 *      being "the trial plan" is no longer an automatic pass).
 *   2. Fail-safe timeout added (if Memberstack never loads, the page
 *      locks instead of silently staying open).
 *
 * How a page uses it (added in a later, approved milestone — NOT yet):
 *   <script data-memberstack-app="app_cmgnwpg8y00x10suih4pua785"
 *           src="https://static.memberstack.com/scripts/v2/memberstack.js"></script>
 *   <script src="/guard.js"></script>
 *
 * This script changes nothing visual. It only decides: stay, or redirect.
 */

(function () {
  "use strict";

  // ---- Settings -----------------------------------------------------------

  // Where to send visitors who are NOT logged in at all.
  // (Matches existing apps.html behavior.)
  var NOT_LOGGED_IN_URL = "/index.html";

  // Where to send visitors who ARE logged in but have no active plan
  // (expired trial, canceled subscription, etc.).
  // (Matches existing apps.html behavior.)
  var NO_ACTIVE_PLAN_URL = "/checkout.html";

  // Plan statuses that count as "in good standing" in Memberstack.
  // ACTIVE   = paid subscription or free plan in force (incl. tester plan)
  // TRIALING = inside the 30-day free trial window
  var GOOD_STATUSES = ["ACTIVE", "TRIALING"];

  // If Memberstack hasn't loaded after this many milliseconds, treat the
  // visitor as not logged in (fail closed rather than leaving the game open).
  var LOAD_TIMEOUT_MS = 10000;

  // ---- Gate logic ---------------------------------------------------------

  function redirect(url) {
    // "replace" so the locked page doesn't stay in browser history.
    window.location.replace(url);
  }

  function waitForMemberstack() {
    return new Promise(function (resolve, reject) {
      var waited = 0;
      (function check() {
        if (window.$memberstackDom) return resolve(window.$memberstackDom);
        waited += 100;
        if (waited >= LOAD_TIMEOUT_MS) return reject(new Error("Memberstack did not load"));
        setTimeout(check, 100);
      })();
    });
  }

  function hasGoodStanding(member) {
    return (
      Array.isArray(member.planConnections) &&
      member.planConnections.some(function (plan) {
        return GOOD_STATUSES.indexOf(plan.status) !== -1;
      })
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    waitForMemberstack()
      .then(function (memberstack) {
        return memberstack.getCurrentMember();
      })
      .then(function (result) {
        var member = result && result.data;

        if (!member) {
          redirect(NOT_LOGGED_IN_URL);          // Not logged in
          return;
        }
        if (!hasGoodStanding(member)) {
          redirect(NO_ACTIVE_PLAN_URL);         // Logged in, no live plan
          return;
        }
        // Member in good standing: do nothing. The game plays normally.
      })
      .catch(function () {
        // Memberstack failed to load or the check errored → lock the door.
        
        redirect(NOT_LOGGED_IN_URL);
      });
  });
})();
