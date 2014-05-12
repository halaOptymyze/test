$( document ).ready(function() {
	
	//Original data Array
	var data = [
		{id: 1, name: 'John Doe', age: 23, salary: 1000, position: 'Frontend Developer', hiringDate: '14-03-2011'},
		{id: 2, name: 'Jane Doe', age: 22, salary: 1001, position: 'Backend Developer', hiringDate: '13-03-2011'},
		{id: 3, name: 'Annette', age: 25, salary: 100000, position: 'All', hiringDate: '14-03-2005'}
	];
	
	//Columns sort
	$('#employeeTable > thead > tr > th').click(function(){
		
		//If there are any rows in table.
		if($('.employee').length){
			
			//Create another data Array only with the elements that exist in the table. 
			var currentData = [];
			
			for(i=0; i<$('.employee').length; i++){
				var currentId = $(".employee:eq(" + i + ") > .rowId").text();
				var currentName = $(".employee:eq(" + i + ") > .rowName").text();
				var currentAge = $(".employee:eq(" + i + ") > .rowAge").text();
				var currentSalary = $(".employee:eq(" + i + ") > .rowSalary").text();
				var currentPosition = $(".employee:eq(" + i + ") > .rowPosition").text();
				var currentHiringDate = $(".employee:eq(" + i + ") > .rowHiringDate").text();
				
				var currentItem = { id: currentId, name: currentName, age: currentAge, salary: currentSalary, position: currentPosition, hiringDate: currentHiringDate };
				currentData.push(currentItem);
			}
			
			//Check what column was clicked and sort the table according to this 
			switch(this.id){
				case 'headId':
					currentData = currentData.sort(function(a, b){ return a.id - b.id; });
					break;
				case 'headName':
					currentData = currentData.sort(function(a, b){ if(a.name < b.name){ return -1; }; if(a.name > b.name){ return 1; }; return 0; });
					break;
				case 'headAge':
					currentData = currentData.sort(function(a, b){ return a.age - b.age; });
					break;
				case 'headSalary':
					currentData = currentData.sort(function(a, b){ return a.salary - b.salary; });
					break;
				case 'headPosition':
					currentData = currentData.sort(function(a, b){ if(a.position < b.position){ return -1; }; if(a.position > b.position){ return 1; }; return 0; });
					break;
				case 'headHiringDate':
					currentData = currentData.sort(function(a, b){ if(a.hiringDate < b.hiringDate){ return -1; }; if(a.hiringDate > b.hiringDate){ return 1; }; return 0; });
					break;
				default:
					currentData = currentData.sort(function(a, b){ return a.id - b.id; });
					break;
			}
			
			//empty the table
			$('#employeeTable').find('tbody').html('');
			
			//render the data after sorting
			currentData.map(render);
		}
	});
	
	//Filter the data according to a parameter
	$('#filterButton').click(function(){
		if($('#filterField').val()){
			//empty the table
			$('#employeeTable').find('tbody').html('');
			
			var filterParam = $('#filterField').val();
			
			//Create a new Array with the filtered results
			var filteredArr = [];
			
			data.map(filterTable);
			function filterTable(row){
				var hasValue = false;
				var keys = Object.keys(row);	
				keys.map(function(k){
					if(!hasValue){
						var stringValue = row[k].toString();
						if(stringValue.toLowerCase().indexOf(filterParam.toLowerCase()) > -1 ){
							hasValue = true;
						}
						if(hasValue){ 
							filteredArr.push(row);
						}
					}	
				});
				
				
			}
			if(filteredArr.length){
				filteredArr.map(render);
			} else {
				$('#employeeTable').find('tbody').html('There are no values for the param <b>' + filterParam + '</b>');
			}
		} else {
			$('#employeeTable').find('tbody').html('');
			data.map(render);
		}
	});
	
	data.map(render);
	
	function render(employee){		
		
		var row = '';
		
		row +='<tr class="employee">';
		row +='<td class="rowId">' + employee.id +'</td>';
		row +='<td class="rowName">' + employee.name +'</td>';
		row +='<td class="rowAge">' + employee.age +'</td>';
		row +='<td class="rowSalary">' + employee.salary +'</td>';
		row +='<td class="rowPosition">' + employee.position +'</td>';
		row +='<td class="rowHiringDate">' + employee.hiringDate +'</td>';
		row +='</tr>'; 
		
		$('#employeeTable').find('tbody').append(row);
		
	}
	
});

