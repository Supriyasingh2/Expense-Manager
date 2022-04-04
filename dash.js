var current_user;
var total_income;
var t_income=0
var total_expense;
var t_expense=0
var balance;
var bal=0
var top_3_cont
var enter_transaction
var all_users_expense
window.addEventListener("load",function(){
    
    current_user=JSON.parse(localStorage.getItem("current_user"))
    top_3_cont=document.getElementById("top_3_info")
    total_income=document.createElement("div")
    total_expense=document.createElement("div")
    balance=document.createElement("div")

    var recent_transactions=document.getElementById("r_transactions")
    recent_transactions.addEventListener("click",displayRecentTrans)

    var form=document.getElementById("form")
    form.addEventListener("submit",handleForm)
    var len=current_user.Transactions.length
    console.log(current_user);
    console.log(current_user.Transactions.length);
    console.log(`current user is : ${current_user}`);
    console.log(`len= ${len}`);
    if(len==0){
        handleFresher()
    }
    else{
        handleUser(current_user)
    }

    var lodger=document.getElementById("lodger")
    lodger.addEventListener("click",redirectLodger)
})

function handleFresher(){
    total_income.textContent=`Total income : ${t_income}`
    total_expense.textContent=`Total expense : ${t_expense}`
    balance.textContent=`Balance : ${bal}`

    top_3_cont.appendChild(total_income)
    top_3_cont.appendChild(total_expense)
    top_3_cont.appendChild(balance)
}


function handleUser(current_user){
    var currentUserTransactions = current_user.Transactions
    console.log(currentUserTransactions);
    for(var x=0;x<currentUserTransactions.length;x++){
        if(currentUserTransactions[x].type=="credit"){
            t_income=t_income+(currentUserTransactions[x].amount)
            bal=bal+Number(currentUserTransactions[x].amount)
        }
        else{
            t_expense=t_expense+Number(currentUserTransactions[x].amount)
            bal=bal-Number(currentUserTransactions[x].amount)
        }
        handleFresher()

    }
}

function TransDetails(title,type,amount,timestamp){
    this.title=title
    this.type=type
    this.amount=amount
    this.timestamp=timestamp
}

function handleForm(){
    event.preventDefault()
    var form=new FormData(event.target)
    var title=form.get("title")
    var credit=form.get("credit")
    var debit=form.get("debit")
    var amount=form.get("amount")
    var type;
    var inputss=document.getElementsByTagName("input")
    for(var i=0;i<inputss.length;i++){
        if(inputss[i].checked){
            type=inputss[i].value
        }
    }
    handleExpenseDisplay(type,amount)
    var timestamp=new Date().toLocaleString()
    console.log(timestamp);
    var transaction_details=new TransDetails(title,type,amount,timestamp)
    saveData(transaction_details)
    console.log(title);
    console.log(type);
    console.log(amount);
}



function saveData(transaction_details){
    current_user.Transactions.push(transaction_details)
    all_users_expense=JSON.parse(localStorage.getItem("expense_users"))
    console.log(current_user.email);
    for(var i=0;i<all_users_expense.length;i++){
        if(current_user.email == all_users_expense[i].email){
            all_users_expense[i]=current_user
        }
    }
    localStorage.setItem("current_user",JSON.stringify(current_user))
    localStorage.setItem("expense_users",JSON.stringify(all_users_expense))

}

function handleExpenseDisplay(type,amount){
    if(type=="credit"){
        t_income=t_income+Number(amount)
        bal=bal+Number(amount)
        handleFresher()

    }
    else if(type == "debit"){
        t_expense=t_expense+Number(amount)
        bal=bal-Number(amount)
        handleFresher()
    }
}

function displayRecentTrans(){
    var recent_t=document.getElementById("recent_trans")
    recent_t.textContent=""
    var table=document.createElement("table")
    var thead=document.createElement("thead")
    var tr_h=document.createElement("tr")
    var h_title=document.createElement("td")
    var h_type=document.createElement("td")
    var h_amount=document.createElement("td")
    var h_timestamp=document.createElement("td")
    var t_body=document.createElement("tbody")
    h_title.textContent="Title"
    h_type.textContent="Type"
    h_amount.textContent="Amount"
    h_tstamp="Timings"
    tr_h.appendChild(h_title)
    tr_h.appendChild(h_type)
    tr_h.appendChild(h_amount)
    tr_h.append(h_tstamp)
    thead.appendChild(tr_h)
    var len_of_transactions=current_user.Transactions.length
    if(current_user.Transactions.length < 1){
        recent_t.textContent="you have no recent transactions"
    }
    else{
        for(var k=0;k<len_of_transactions;k++){
            if(k<5){
                var tr_s=document.createElement("tr")
                var td_tite=document.createElement("td")
                var td_type=document.createElement("td")
                var td_amount=document.createElement("td")
                var td_timestamp=document.createElement("td")
                td_tite.textContent=current_user.Transactions[len_of_transactions-k-1].title
                td_type.textContent=current_user.Transactions[len_of_transactions-k-1].type
                td_amount.textContent=current_user.Transactions[len_of_transactions-k-1].amount
                td_timestamp.textContent=current_user.Transactions[len_of_transactions-k-1].timestamp
                tr_s.appendChild(td_tite)
                tr_s.appendChild(td_type)
                tr_s.appendChild(td_amount)
                tr_s.appendChild(td_timestamp)
                t_body.appendChild(tr_s)
            }
            
        }
    }
    table.appendChild(thead)
    table.appendChild(t_body)
    recent_t.appendChild(table)
}


function redirectLodger(){
    window.location.href="file:///E:/masai_school/expenceManager/Project-Module3/LEDGER/ledger.html"
}