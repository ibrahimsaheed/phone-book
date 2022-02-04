// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}
AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};
AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};
AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, secondName, lastName, email, nationality, address) {
  this.firstName = firstName;
  this.secondName = secondName;
  this.lastName = lastName;
  this.email = email;
  this.nationality = nationality;
  this.address = address;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();
function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.secondName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function displaySearchContactDetails(addressBookToDisplay, ContactID) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  //Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
  if (ContactID === "") {

  }
  displayContactDetails(addressBookToDisplay);
  const contact = addressBookToDisplay.findContact(ContactID);
  htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.secondName + " " + contact.lastName + "</li>";
  //});
  contactsList.html(htmlForContactInfo);
}
function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".second-name").html(contact.secondName);
  $(".last-name").html(contact.lastName);
  $(".email").html(contact.email);
  $(".nationality").html(contact.nationality);
  $(".address").html(contact.address);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton btn btn-outline-danger' id='" + contact.id + "'>Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
    $("#show-contact").show();
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });


};


$(document).ready(function () {
  attachContactListeners();
  $(".save").click(function (event) {
    event.preventDefault();
    const inputtedFirstName = $("#firstname").val();
    const inputtedSecondName = $("#secondname").val();
    const inputtedLastName = $("#lastname").val();
    const inputtedEmail = $("#email").val();
    const inputtedNationality = $("#nationality").val();
    const inputtedAddress = $("#address").val();
    $("#firstname").val("");
    $("#secondname").val("");
    $("#lastname").val("");
    $("#email").val("");
    $("#nationality").val("");
    $("#address").val("");
    let newContact = new Contact(inputtedFirstName, inputtedSecondName, inputtedLastName, inputtedEmail, inputtedNationality, inputtedAddress);
    addressBook.addContact(newContact);
    console.log(addressBook.contacts);
    displayContactDetails(addressBook);

  })

  $(".search3").click(function () {
    let inputsearch = $(".search").val();
    displaySearchContactDetails(addressBook, inputsearch)
  })
})




//  $("form#new-contact").submit(function(event) {
//  event.preventDefault();
 // const inputtedFirstName = $("input#new-first-name").val();
 // const inputtedLastName = $("input#new-last-name").val();
 // const inputtedPhoneNumber = $("input#new-phone-number").val();
 // let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
 // addressBook.addContact(newContact);
 // console.log(addressBook.contacts);
// });
// });