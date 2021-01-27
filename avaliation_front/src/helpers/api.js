export const post = async (endpoint, body, affter) => {
    var error = false;
    var text = 'Falha na conexão';
    await fetch('http://localhost:8000/' + endpoint, {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(body)
    }).then(r => {
        if (!r.ok) {
            error = true
        }
        return r.text()
    }).then(r => {
        text = r;
        return JSON.parse(r)
    }).then(r => {
        text = r;
    }).catch((ex) => {
        error = true
        console.log('body: '+text)
        console.log(ex)
    })
    affter({ error, ret: text });
}