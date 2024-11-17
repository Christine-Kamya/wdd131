
let participantCount = 1;


function participantTemplate(count) {
    return `
        <section class="participant${count}">
            <p>participant${count}</p>
            <div class="item">
              <label for="fname"> First Name<span>*</span></label>
              <input id="fname" type="text" name="fname" value="" required />
            </div>
            <div class="item activities">
              <label for="activity">Activity #<span>*</span></label>
              <input id="activity" type="text" name="activity" />
            </div>
            <div class="item">
              <label for="fee">Fee ($)<span>*</span></label>
              <input id="fee" type="number" name="fee" />
            </div>
            <div class="item">
              <label for="date">Desired Date <span>*</span></label>
              <input id="date" type="date" name="date" />
            </div>
            <div class="item">
              <p>Grade</p>
              <select>
                <option selected value="" disabled selected></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </select>
            </div>
          </section>

          
        
    `

    
};




document.getElementById('add').addEventListener('click', function() {
    participantCount++;
    const participantSection = document.querySelector('#add');
    participantSection.insertAdjacentHTML('beforebegin', participantTemplate(participantCount));
    console.log("afsafs");;
});


function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log(feeElements);
    feeElements = [...feeElements];
    
    
    return feeElements.reduce((total, feeInput) => {
        return total + parseFloat(feeInput.value) || 0;
    }, 0);
}


function successTemplate(info) {
    return `
        <p>Thank you, ${info.adultName}, for registering. You have registered ${info.numParticipants} participants and owe $${info.totalFees.toFixed(2)} in fees.</p>
    `;
}


function submitForm(event) {
    event.preventDefault();

    console.log("aaaaaaaaaaaaaa");

    
    const adultName = document.getElementById('adult_name').value;
    console.log(adultName);

    
    const total = totalFees();
    console.log(total);


    
    document.getElementById('registration-form').style.display = 'none';

    
    const summarySection = document.getElementById('summary');
    summarySection.classList.remove('hide');

    
    const info = {
        adultName: adultName,
        numParticipants: participantCount,
        totalFees: total
    };

    
    document.getElementById('success-message').innerHTML = successTemplate(info);
}


document.getElementById('submitButton').addEventListener('submit', submitForm);
