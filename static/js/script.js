// handle onSubmit
const form = document.getElementsByTagName('form')[0]
form.addEventListener('submit', function(event) {
    event.preventDefault()
})

const capitalizeEachWord = (text) => {
    return text.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    })
}

// submit button
const submitButton = document.getElementById('submit_button')

// get input data
const namaMhs = document.querySelector('input[name="nama_mhs"]')
const kelasMhs = document.querySelector('select[name="kelas_mhs"]')
const genderMhs = document.querySelector('select[name="gender_mhs"]')
const npmMhs = document.querySelector('input[name="npm_mhs"]')
const nilaiMhs = document.querySelector('input[name="nilai_mhs"]')


// display target data
const targetnamaMhs = document.querySelector('p#nama_mhs')
const targetkelasMhs = document.querySelector('p#kelas_mhs')
const targetgenderMhs = document.querySelector('p#gender_mhs')
const targetnpmMhs = document.querySelector('p#npm_mhs')
const targetnilaiMhs = document.querySelector('p#nilai_mhs')
const predikatMhs = document.getElementById('predikat_mhs')
const statusElm = document.getElementById('kelulusan_mhs')
const dataStatus = document.getElementById('data-status')

// display container
const resultSection = document.getElementById('result-container')

// sytling porpused
const formContainer = document.getElementById('form-container')

// handling form submit
submitButton.addEventListener('click', async function() {

    let dataObject = {
        [namaMhs.name]: namaMhs.value,
        [kelasMhs.name]: kelasMhs.value,
        [genderMhs.name]: genderMhs.value,
        [nilaiMhs.name]: nilaiMhs.value,
        [npmMhs.name]: npmMhs.value,
    }

    await fetch('/validateData', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(dataObject)
    }).then((response) => response.json())
        .then((data) => dataObject = data)
            .catch((error) => console.log(error))

    const { nama, npm, gender, kelas, nilai, status, predikat } = dataObject.data

    if(dataObject.result === 'error') {

        targetnilaiMhs.innerHTML = '-'
        targetkelasMhs.innerHTML = '-'
        targetgenderMhs.innerHTML = '-'
        targetnpmMhs.innerHTML = '-'
        targetnamaMhs.innerHTML = '-'
        predikatMhs.innerHTML = '-'
        statusElm.innerHTML = '-'

        dataStatus.classList.remove('success')
        dataStatus.classList.add('error')
        dataStatus.innerHTML = dataObject.msg

        formContainer.style.boxShadow = '0 4px 8px 0 red, 0 6px 20px 0 red'
        setTimeout(() => {
            formContainer.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            dataStatus.classList.remove('error')
            dataStatus.innerHTML = ''
        }, 3000)
    } else {

        predikatMhs.style.color= status === 'TIDAK LULUS' ? 'red' : '#1c448e'
        statusElm.style.color= status === 'TIDAK LULUS' ? 'red' : '#1c448e'

        dataStatus.classList.remove('error')
        dataStatus.classList.add('success')
        dataStatus.innerHTML = dataObject.msg

        formContainer.style.boxShadow = '0 4px 8px 0 #1c448e, 0 6px 20px 0 #1c448e'
        setTimeout(() => {
            dataStatus.classList.remove('success')
            dataStatus.innerHTML = ''
            formContainer.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }, 3000)
    }
    targetnilaiMhs.innerHTML = nilai || '-'
    targetkelasMhs.innerHTML = kelas || '-'
    targetgenderMhs.innerHTML = gender || '-'
    targetnpmMhs.innerHTML = npm || '-'
    targetnamaMhs.innerHTML = capitalizeEachWord(nama) || '-'
    predikatMhs.innerHTML = predikat || '-'
    statusElm.innerHTML = status || '-'

})
