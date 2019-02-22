window.onload = function () {
    document.getElementById("upload-button").addEventListener("click", uploadNote);
}

function uploadNote() {

    var form = document.getElementById('file-form');
    var fileSelect = document.getElementById('file-select');
    var uploadButton = document.getElementById('upload-button');

    form.onsubmit = function (event) {
        event.preventDefault();

        // Update button text.
        uploadButton.innerHTML = 'Uploading...';

        // Get the selected files from the input.
        var files = fileSelect.files;

        // Create a new FormData object.
        var formData = new FormData();

        // Loop through each of the selected files.
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // Check the file type.
            if (!file.type.match('application/pdf.*') || !file.type.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document.*')) {
                continue;
            }

            // Add the file to the request.
            formData.append('files[]', file, file.name);

            // Files
            formData.append(name, file, filename);

            // Blobs
            formData.append(name, blob, filename);

            // Strings
            formData.append(name, value);

            // Set up the request.
            var xhr = new XMLHttpRequest();

            // Open the connection.
            xhr.open('POST', 'handler.php', true);

            // Send the Data.
            xhr.send(formData);
        }

        // Set up a handler for when the request finishes.
        xhr.onload = function () {
            if (xhr.status === 200) {
                // File(s) uploaded.
                uploadButton.innerHTML = 'Upload';
            } else {
                alert('An error occurred!');
            }
        };
    }
}