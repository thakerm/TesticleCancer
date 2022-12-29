//Debug
var debug=true;
var LOG = debug ? console.log.bind(console) : function () {}; // will turn off all console.log statements.

//Variables
var col_labels = ['H&P and Labs','CT','Chest'];
var row_labels = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
var data_for_processing;
var parsedTable;

//initializes Stagging selection 
function myOnLoad()
{
    var default_date = new Date();
    default_date = process_date(default_date);
    document.querySelector('#date').value = default_date;
    var select_ = document.querySelector('#path');
    updateForm(select_);
}

function updateForm(path)
{

    var selectedText = path.options[path.selectedIndex].innerHTML;
    var selectedValue = path.value;

    if (selectedValue==0)
    {
        $("#stage").empty();

        const select = document.querySelector('#stage');
        const arr = [
        'Clinical Stage 1 After Orchiectomy', 
        'Clinical Stage 1 After Ajuvant Therapy (Radiation or Chemotherapy)', 
        'Clinical Stage I Seminoma: Surveillance After Adjuvant Treatment (Chemotherapy or Radiation)',
        'Bulky Clinical Stage IIB, IIC, and Stage III Seminoma: Surveillance Postchemotherapy'];
        for (const [index, a] of arr.entries()) {
          const opt = document.createElement('option');
          opt.value = index; //nmust add one to make it match current selection numbering 
          opt.innerHTML = a;
          select.appendChild(opt);
        }
    }
    else if (selectedValue==1)
    {
        $("#stage").empty();

        const select = document.querySelector('#stage');
        const arr = [
        'Clinical Stage I without Risk Factors, NSGCT: Active Surveillance', 
        'Clinical Stage I with Risk Factors,a NSGCT: Active Surveillance', 
        'Clinical Stage IA/B NSGCT: Treated with 1 Cycle of Adjuvant BEP Chemotherapy or Primary RPLND',
        'Clincal Stage II/III NSGCT: Surveillance After Complete Response to Chemotherapy ± Postchemotherapy RPLND',
        'Pathologic Stage IIA/B NSGCT: Post-Primary RPLND and Treated with Adjuvant Chemotherapy',
        'Pathologic Stage IIA/B NSGCT: Post-Primary RPLND and NOT Treated with Adjuvant Chemotherapy'];
        for (const [index, a] of arr.entries()) {
          const opt = document.createElement('option');
          opt.value = index;
          opt.innerHTML = a;
          select.appendChild(opt);
        }
    }
}

//function will help process GCT vs NSGCT
function filter(path, stage, date)
{
    var results = document.getElementById("results");
    document.querySelector(date).stepUp(1); //must do this to get correct date 
    var date_value = document.querySelector(date).value;
    document.querySelector(date).stepDown(1); 
    var stage_value = document.querySelector(stage).value;
    var path_value = document.querySelector(path).value;
    generateTable(); //initialize table. 

    if (path_value==0){
            
        if(stage_value==0)
        {
            generate(GCT_stage_1_after_orch_HP_Labs = [[3,6],6,[6,12],12,12],stage_value,date_value,type="H&P/Labs");
            //generate(GCT_stage_1_after_orch_CT = [6,6,6,12,12,12,24],stage_value,date_value,type="CT");
            
     
            
        }
    }
 
}
function process_date(date)
{
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var date_corrected = year+"-"+month+"-"+day;
    return date_corrected;
}

function generate(stage_data,stage_value,date,type)
{
        var results = document.getElementById("results");
        var cell;
        var dt = new Date(date); //initial date set by user
        var dt_working = new Date(date);
       

  
            
    }



   /*  if (x>1)
                {
                   
                    for (j=0;j<x;j++)
                    {
                       
                       
                        LOG("Stage_data[i][j]",stage_data[i][j]);
    
                        y = 12/stage_data[i][j];
                        
                        LOG(type," Year  ",i+1," ",stage_data[i][j]," month interval. Total number of dates generated: ",y);
    
            
                        for(m=0;m<y;m++)
                        {
                            date_working.setMonth(date_working.getMonth() + stage_data[i][j]);

                        
                           LOG("Date working",m," ",date_working);
                           LOG("Date value",m," ",date_value);
         
                        }
                        
                        date_working = date_value
                        //date_value=date_value.toDateString();
                        LOG("Date value after For M loop",m," ",date_working);
                        //LOG("TypeOf", typeof date_value);
        
                    }
                } */



function generateTable()
{
//generates table
  parsedTable = document.createElement("TABLE");
  table_classes = "table table-bordered table-sm table-striped table-hover";
  parsedTable.setAttribute("class", table_classes);
  parsedTable.setAttribute("id", "TABLE");
  tabelHeader = parsedTable.createTHead();
tabelHeader.className = "table-info";
  tableBody = parsedTable.createTBody();
  return;

}