
test('Singleton Tests', function() {
	var mapVariables1 = MapVariablesClass.getInstance();
	var mapVariables2 = MapVariablesClass.getInstance();
	equal(mapVariables1, mapVariables2, 'check if MapVariablesClass is singleton class');
	
	var containerObj1 = ContainerClass.getInstance();
	var containerObj2 = ContainerClass.getInstance();
	equal(containerObj1, containerObj2, 'check if ContainerClass is singleton class');
	
})


