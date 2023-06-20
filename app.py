from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/tugas-1')
def tugas_1():
    return render_template('tugas1.html')

@app.route('/tugas-2')
def tugas_2():
    return render_template('tugas2.html')

@app.route('/tugas-3')
def tugas_3():
    return render_template('tugas3.html')

@app.route('/validateData',methods = ['POST'])
def retriveData():
   data = request.get_json()
   
   if not data['nama_mhs'] or not data['npm_mhs'] or not data['gender_mhs'] or not data['kelas_mhs'] or not data['nilai_mhs'] :
      return jsonify({'result': 'error', 'msg': 'Data Tidak Lengkap', 'data': {}})

   if len(data['npm_mhs']) <= 7 :
      return jsonify({'result': 'error', 'msg': 'NPM Harus Berjumlah 8', 'data': {}})

   nilai = int(data['nilai_mhs'])
   status = 'TIDAK LULUS'
   predikat = 'E (Kurang Sekali)'

   if nilai >= 80 and nilai <= 100:
      predikat = 'A (Sangat Baik)'
      status = 'LULUS'
   elif nilai >= 68 and nilai <= 79:
      predikat = 'B (Baik)'
      status = 'LULUS'
   elif nilai >= 56 and nilai <= 67:
        predikat = 'C (Cukup)'
        status = 'LULUS'
   elif nilai >= 45 and nilai <= 55:
        predikat = 'D (Kurang)'
   elif nilai >= 0 and nilai <= 44:
       predikat = 'E (Kurang Sekali)'
   else:
       return jsonify({'result': 'error', 'msg': 'Data Tidak Valid !', 'data': {}})

   if int(data['nilai_mhs']) > 100 :
    return jsonify({'result': 'error', 'msg': 'Data tidak valid!'})

    # success return
   return jsonify({
       'result': 'success',
       'msg': 'Data  Diterima ',
       'data': {
           'nama': data['nama_mhs'],
           'npm': data['npm_mhs'],
           'gender': data['gender_mhs'],
           'kelas': data['kelas_mhs'],
           'nilai': data['nilai_mhs'],
           'status': status,
           'predikat': predikat
       }
   })

if __name__ == '__main__':
    app.run(debug=True, port=8001)