$( document ).ready(function() {
	
	var data = [
		{id: 1, name: 'John Doe', age: 23, salary: 1000, position: 'Frontend Developer', hiringDate: '14-03-2011'},
		{id: 2, name: 'Jane Doe', age: 22, salary: 1001, position: 'Backend Developer', hiringDate: '13-03-2011'},
		{id: 3, name: 'Annette', age: 25, salary: 100000, position: 'All', hiringDate: '14-03-2005'}
	];
	
	$('#employeeTable > thead > tr > th').click(function(){
		$('#employeeTable').find('tbody').html('');
		
		switch(this.id){
			case 'headId':
				data = data.sort(function(a, b){ return a.id - b.id; });
				break;
			case 'headName':
				data = data.sort(function(a, b){ if(a.name < b.name){ return -1; }; if(a.name > b.name){ return 1; }; return 0; });
				break;
			case 'headAge':
				data = data.sort(function(a, b){ return a.age - b.age; });
				break;
			case 'headSalary':
				data = data.sort(function(a, b){ return a.salary - b.salary; });
				break;
			case 'headPosition':
				data = data.sort(function(a, b){ if(a.position < b.position){ return -1; }; if(a.position > b.position){ return 1; }; return 0; });
				break;
			case 'headHiringDate':
				data = data.sort(function(a, b){ if(a.hiringDate < b.hiringDate){ return -1; }; if(a.hiringDate > b.hiringDate){ return 1; }; return 0; });
				break;
			default:
				data = data.sort(function(a, b){ return a.id - b.id; });
				break;
		}
		
		data.map(render);
		
	});
	
	$('#filterButton').click(function(){
		if($('#filterField').val()){
			$('#employeeTable').find('tbody').html('');
			var filterParam = $('#filterField').val();
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
		
		row +='<tr class="employee"></tr>';
		row +='<td class="rowId">' + employee.id +'</td>';
		row +='<td class="rowName">' + employee.name +'</td>';
		row +='<td class="rowAge">' + employee.age +'</td>';
		row +='<td class="rowSalary">' + employee.salary +'</td>';
		row +='<td class="rowPosition">' + employee.position +'</td>';
		row +='<td class="rowHiringDate">' + employee.hiringDate +'</td>';
		
		$('#employeeTable').find('tbody').append(row);
		
		
	}
	
});

