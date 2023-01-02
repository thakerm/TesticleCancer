//Debug
var debug = true;
var LOG = debug ? console.log.bind(console) : function () {}; // will turn off all console.log statements.

//Global  Variables

var data_for_processing;
var parsedTable;

//initializes Stagging selection
$(function () {
  document.querySelector("#date").value = process_date(new Date());
  var path = document.querySelector("#path");
  updateForm(path);
});

//converts selected date into format we can edit
function process_date(date) {
  var day = date.getDate();

  var month = date.getMonth() + 1;

  var year = date.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  var date_corrected = year + "-" + month + "-" + day;

  return date_corrected;
}

//auto populates Stage select element
function updateForm(path) {
  var selectedValue = path.value;

  if (selectedValue == 0) {
    $("#stage").empty();

    const select = document.querySelector("#stage");
    const arr = [
      "Clinical Stage 1 After Orchiectomy",
      "Clinical Stage 1 After Ajuvant Therapy (Radiation or Chemotherapy)",
      "Clinical Stage I Seminoma: Surveillance After Adjuvant Treatment (Chemotherapy or Radiation)",
      "Bulky Clinical Stage IIB, IIC, and Stage III Seminoma: Surveillance Postchemotherapy",
    ];
    for (const [index, a] of arr.entries()) {
      const opt = document.createElement("option");
      opt.value = index; //must add one to make it match current selection numbering
      opt.innerHTML = a;
      select.appendChild(opt);
    }
  } else if (selectedValue == 1) {
    $("#stage").empty();

    const select = document.querySelector("#stage");
    const arr = [
      "Clinical Stage I without Risk Factors, NSGCT: Active Surveillance",
      "Clinical Stage I with Risk Factors,a NSGCT: Active Surveillance",
      "Clinical Stage IA/B NSGCT: Treated with 1 Cycle of Adjuvant BEP Chemotherapy or Primary RPLND",
      "Clincal Stage II/III NSGCT: Surveillance After Complete Response to Chemotherapy ± Postchemotherapy RPLND",
      "Pathologic Stage IIA/B NSGCT: Post-Primary RPLND and Treated with Adjuvant Chemotherapy",
      "Pathologic Stage IIA/B NSGCT: Post-Primary RPLND and NOT Treated with Adjuvant Chemotherapy",
    ];
    for (const [index, a] of arr.entries()) {
      const opt = document.createElement("option");
      opt.value = index;
      opt.innerHTML = a;
      select.appendChild(opt);
    }
  }
}

//function will help process GCT vs NSGCT
function filter(path, stage, date) {
  document.querySelector(date).stepUp(1); //must do this to get correct date
    var date_value = document.querySelector(date).value;
  document.querySelector(date).stepDown(1);
    stage_value = document.querySelector(stage).value;
    var stage_header = document.querySelector(stage);
    output = stage_header.options[stage_header.selectedIndex].textContent;
  document.getElementById("stage_header").innerHTML=output;
  
  var path_value = document.querySelector(path).value;
  generateTable(); //initialize table.

  if (path_value == 0) { //GCT
    if (stage_value == 0) {
      generate(
        (GCT_stage_1_0= [
        "H&P/Labs",12,[6,12],12,12,12,
        "CT",6,6,12,12,24,
        "CXR",1,1,1,1,1]),
        date_value
      );
     
    }
    else if(stage_value==1)
    {
        generate(
            (GCT_stage_1_1 = [
            "H&P/Labs",6,6,12,12,12,
            "CT",12,12,12,1,1,
            "CXR",1,1,1,1,1]),
            date_value
          );
    }
  }
}

function generateTable() {
  //generates table
  var col_labels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
  parsedTable = document.createElement("TABLE");
  table_classes = "table table-bordered table-sm table-striped table-hover";
  parsedTable.setAttribute("class", table_classes);
  parsedTable.setAttribute("id", "TABLE");
  tabelHeader = parsedTable.createTHead();
  tableBody = parsedTable.createTBody();
 

  //Generate Header
  tabelHeader.className = "table-info";
  header = "<tr id='header'><td rowspan='2'></td><td colspan='5'><b>Year (at month intervals)</b></td></tr><tr id='header'>";
  for (
    i = 0;
    i < col_labels.length;
    i++ //run through columns year 1-5)
  ) {
        header += '<th>' + col_labels[i] + "</th>";
    
  }
  header += "</tr>";
  $(tabelHeader).append(header);
  $(parsedTable).append(tabelHeader);
  return;
}

function generate(stage_data, date) {
  var dt=new Date(date);
  var dt_working = new Date(date);
  var date_array;
  resultBody = $("#results");
  count = 0;

  body = "";

    for (
        i = 0;
        i < stage_data.length; //12
        i++ //run through columns year 1-5)
    ) {
        x=stage_data[i].length;
        if (i == 0 || i==6 ||i==12) { //row headers
            var dt_working = new Date(date);
            body += "<tr><td><b>" + stage_data[i] + "</b></td>";
            continue;
        }
        
        if(stage_data[i]==1)
        {
                //LOG("Stage Date CXR: ",stage_data[i])
                body+="<td>"
                body += "Not Clinically Relevant";
                continue;
        }
        else if(x>1) //trying to generate multiple dates 
        {
        
            for (j = 0; j < x; j++) 
            {
                if(j==0)
                {
                   body += "<td><b> "+stage_data[i][j]+" month intervals:</b> <br>";
                   LOG("Stage_data[i][j]", stage_data[i][j]);
                   
                }
                else
                {
                body += "<b> "+stage_data[i][j]+" month intervals:</b> <br>";
                //dt_working = dt;
                }
                   y = 12 / stage_data[i][j];
            
                   LOG(" Year  ",i," ",stage_data[i][j]," month interval. Total number of dates generated: ",y);
            
                   for (m = 0; m < y; m++) {
                    
                     
                     dt_working.setMonth(dt_working.getMonth() + stage_data[i][j]);
                     body += dt_working.toLocaleDateString('en-US') + "<br>";
                    
                     LOG("Active Date", m, " ", dt_working);
                     LOG("Stored Date", m, " ", dt);
                   }
            
                    //dt_working = dt;
                    LOG("DT WORKING = DT: ",dt_working)
            }
            
            
        }
        else{
            body += "<td><b> "+stage_data[i]+" month intervals:</b> <br>";
            y = 12 / stage_data[i];
            for (m = 0; m < y; m++) 
            {
                dt_working.setMonth(dt_working.getMonth() + stage_data[i]);
                body += dt_working.toLocaleDateString('en-US')+ "<br>";
                LOG("Date working", dt_working);
           
            }
            
        }
 
       
        body += "</td>";
        count++;
    }

  $(tableBody).append(body);
  $(parsedTable).append(tableBody);
  resultBody.append(parsedTable);
}





 /*  LOG(
            type,
            " Year ",
            i + 1,
            " ",
            stage_data[i],
            " month interval. Total number of dates generated: ",
            y
        ); */
        //LOG("Stage Date CXR: ",stage_data[i])
