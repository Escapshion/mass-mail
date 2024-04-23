//---------validating emails--------------
let upload = document.getElementById('upload');
upload.addEventListener('change', () => {
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);
    fr.onload = function () {

        let Arr = fr.result.split(/\r?\n|\n/).map(e => {
            return e.split(',');
        });
        window.valNo = 0;
        let invalNo = 0;
        window.valMail = [];
        Arr.forEach(e => {
            let em = String(e);
            let m = e.map(e => {
                return `<td>${e}</td>`; // td = table data
            })
            let creEle = document.createElement("tr"); //tr = table row
            creEle.innerHTML = m;    
            if (em != "") { // so that blank row will not be printed as well as counted
                // if (em.indexOf('@') != 0) {
                //     document.querySelector("table#val").appendChild(creEle);
                //     return false;
                // }
                                
                if (em.charAt(em.length - 4) == '.') {     
                    document.querySelector("table#val").appendChild(creEle);
                    window.valMail.push(em);   
                    window.valNo = window.valNo + 1;
                    return false;
                }
                else if (em.charAt(em.length - 3) == '.') {    
                    document.querySelector("table#val").appendChild(creEle);
                    window.valMail.push(em);   
                    window.valNo = window.valNo + 1;
                    return false;
                }
                else {                                    
                    document.querySelector("table#inval").appendChild(creEle);  
                    invalNo = invalNo + 1;
                    // console.log(creEle);
                    return false;
                }
            }
        });

        document.querySelector('#valCount').innerHTML = window.valNo;
        document.querySelector('#invalCount').innerHTML = invalNo;
    };
});
//-----------sending emails---------------

/*function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "arjubano50@gmail.com", 
        Password: "AB21408E930F8DF83D222DA6D0203493DE2E",  
        To: "",
        From: "arjubano50@gmail.com",
        Subject: document.querySelector('#subject').value,
        Body: document.getElementById('msg').value
    }).then(
        message => alert(window.valNo + " mails has been sent successfully, press " + message + " to continue.")
    );
    console.log(document.getElementById('msg').value);
    console.log(document.getElementById('msg').innerHTML);
    console.log(document.getElementById('msg').innerText);
}*/

function sendEmail() {
    let validEmails = window.valMail;

    // Iterate over each valid email
    validEmails.forEach(email => {
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "arjubano50@gmail.com",
            Password: "AB21408E930F8DF83D222DA6D0203493DE2E",
            To: email, // Send to the current valid email
            From: "arjubano50@gmail.com",
            Subject: document.querySelector('#subject').value,
            Body: document.getElementById('msg').value
        }).then(
			message => alert(validEmails.length + " valid emails have been sent, press" + message + " to continue.")
        );
    });

    // Display alert for the number of emails sent
	console.log(document.getElementById('msg').value);
    console.log(document.getElementById('msg').innerHTML);
    console.log(document.getElementById('msg').innerText);
}
