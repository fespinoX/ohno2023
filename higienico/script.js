function addEntry() {
    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" name="brand[]" placeholder="Marca"></td>
        <td><input type="number" name="price[]" step="0.01" placeholder="Precio ($)"></td>
        <td><input type="number" name="meters[]" step="1" placeholder="Metros"></td>
        <td>
            <select name="fold[]">
                <option value="single">Simple Hoja</option>
                <option value="double">Doble Hoja</option>
            </select>
        </td>
        <td><input type="number" name="rolls[]" step="1" placeholder="Cantidad de Rollos"></td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Borrar</button></td>
    `;
    document.getElementById("tpTable").getElementsByTagName('tbody')[0].appendChild(newRow);
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function calculate() {
    var rows = document.getElementById("tpTable").getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var minPrice = Infinity;
    var mostConvenientOption;

    for (var i = 0; i < rows.length; i++) {
        var priceInput = rows[i].querySelector('input[name="price[]"]');
        var metersInput = rows[i].querySelector('input[name="meters[]"]');
        var foldTypeSelect = rows[i].querySelector('select[name="fold[]"]');
        var rollsInput = rows[i].querySelector('input[name="rolls[]"]');
        var pricePerMeterCell = rows[i].querySelector('td:last-child');

        var price = parseFloat(priceInput.value);
        var meters = parseInt(metersInput.value);
        var foldType = foldTypeSelect.value;
        var rolls = parseInt(rollsInput.value);

        var effectiveMeters = meters * (foldType === 'double' ? 2 : 1);
        var pricePerMeter = price / (effectiveMeters * rolls);
        pricePerMeterCell.textContent = pricePerMeter.toFixed(2) + "$ por metro";

        if (pricePerMeter < minPrice) {
            minPrice = pricePerMeter;
            mostConvenientOption = rows[i];
        }
    }

    document.getElementById("result").innerHTML = "La opción más conveniente es: " + mostConvenientOption.querySelector('input[name="brand[]"]').value + " ($" + minPrice.toFixed(2) + " por metro)";
    
    // Marking the most convenient option
    mostConvenientOption.classList.add('convenient');
}