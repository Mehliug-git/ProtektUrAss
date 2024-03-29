/*
PUNYCODE : аpple.com

NORMAL  : apple.com
*/

function containsPunycode(domain) {
  // Vérifie si le domaine contient des caractères non-ASCII
  if (/[^\x00-\x7F]|xn--[a-z0-9-]+.*/.test(domain)) {
      return false;
  } else {
      return true;
  }
}