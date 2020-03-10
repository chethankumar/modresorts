  
#!/usr/bin/env bash
jsonFile=$1;
fileType=$2;

node > out_${jsonFile} <<EOF
//Read data
var data1 = require('./${jsonFile}');
//Manipulate data
var data = {};
if(!data1[0].label){
  data1[0].label = data1[0].filename;
}
data = data1[0];
data.author = 'admin';
data.author_display = 'admin';
data.isAppLink = 'false';
data.mandatory = 'N';
data.description = '';
data.remote_url = '';
data.is_installer = 'Y';
data.is_active = 'Y';
data.is_ready_prod = 'Y';
data.files = [];
appdata = {};
appdata.type = '${fileType}';
appdata.cid = data.cid;
appdata.size = data.size;
appdata.filename = data.filename;
data.files[0] = appdata;
//Output data
console.log(JSON.stringify(data));
EOF
