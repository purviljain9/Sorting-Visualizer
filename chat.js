// Global variables
var array = [];

// Generate a new array with random elements
function resetArray() {
    var arraySize = prompt("Enter the size of the array:");
    array = [];
    var arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";

    for (var i = 0; i < arraySize; i++) {
        var value = Math.floor(Math.random() * 100) + 1;
        array.push(value);

        var bar = document.createElement("div");
        bar.className = "array-bar";
        bar.style.height = value + "px";
        arrayContainer.appendChild(bar);

        var number = document.createElement("span");
        number.className = "bar-number";
        number.innerText = value;
        bar.appendChild(number);
    }
}

// Swap the heights of two array bars
function swap(bar1, bar2) {
    var temp = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = temp;
}

// Bubble sort algorithm
async function bubbleSort() {
    var bars = document.getElementsByClassName("array-bar");

    for (var i = 0; i < array.length - 1; i++) {
        for (var j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 100)
            );

            if (array[j] > array[j + 1]) {
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                swap(bars[j], bars[j + 1]);
            }

            bars[j].style.backgroundColor = "#007bff";
            bars[j + 1].style.backgroundColor = "#007bff";
        }

        bars[array.length - i - 1].style.backgroundColor = "green";
    }

    bars[0].style.backgroundColor = "green";
}

// Selection sort algorithm
async function selectionSort() {
    var bars = document.getElementsByClassName("array-bar");

    for (var i = 0; i < array.length - 1; i++) {
        var minIndex = i;

        bars[minIndex].style.backgroundColor = "red";

        for (var j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = "red";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 100)
            );

            if (array[j] < array[minIndex]) {
                bars[minIndex].style.backgroundColor = "#007bff";
                minIndex = j;
                bars[minIndex].style.backgroundColor = "red";
            } else {
                bars[j].style.backgroundColor = "#007bff";
            }
        }

        if (minIndex !== i) {
            var temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            swap(bars[i], bars[minIndex]);
        }

        bars[i].style.backgroundColor = "green";
    }

    bars[array.length - 1].style.backgroundColor = "green";
}

// Insertion sort algorithm
async function insertionSort() {
    var bars = document.getElementsByClassName("array-bar");

    for (var i = 1; i < array.length; i++) {
        var key = array[i];
        var j = i - 1;

        bars[i].style.backgroundColor = "red";

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = "red";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 100)
            );

            array[j + 1] = array[j];
            swap(bars[j], bars[j + 1]);

            bars[j].style.backgroundColor = "#007bff";
            j--;
        }

        array[j + 1] = key;
        bars[i].style.backgroundColor = "#007bff";

        for (var k = 0; k <= i; k++) {
            bars[k].style.backgroundColor = "green";
        }
    }

    for (var k = 0; k < array.length; k++) {
        bars[k].style.backgroundColor = "green";
    }
}

// Merge sort algorithm
async function mergeSort() {
    var bars = document.getElementsByClassName("array-bar");
    await mergeSortHelper(array, 0, array.length - 1, bars);
}

async function mergeSortHelper(arr, start, end, bars) {
    if (start >= end) return;

    var mid = Math.floor((start + end) / 2);

    await mergeSortHelper(arr, start, mid, bars);
    await mergeSortHelper(arr, mid + 1, end, bars);
    await merge(arr, start, mid, end, bars);
}

async function merge(arr, start, mid, end, bars) {
    var p = start,
        q = mid + 1;
    var tempArr = [],
        k = 0;

    for (var i = start; i <= end; i++) {
        if (p > mid) {
            tempArr[k++] = arr[q++];
            bars[q - 1].style.backgroundColor = "red";
        } else if (q > end) {
            tempArr[k++] = arr[p++];
            bars[p - 1].style.backgroundColor = "red";
        } else if (arr[p] < arr[q]) {
            tempArr[k++] = arr[p++];
            bars[p - 1].style.backgroundColor = "red";
        } else {
            tempArr[k++] = arr[q++];
            bars[q - 1].style.backgroundColor = "red";
        }
    }

    for (var j = 0; j < k; j++) {
        arr[start++] = tempArr[j];
        bars[start - 1].style.height = arr[start - 1] + "px";

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 100)
        );

        bars[start - 1].style.backgroundColor = "#007bff";
    }
}

// Quick sort algorithm
async function quickSort() {
    var bars = document.getElementsByClassName("array-bar");
    await quickSortHelper(array, 0, array.length - 1, bars);
}

async function quickSortHelper(arr, low, high, bars) {
    if (low < high) {
        var pi = await partition(arr, low, high, bars);
        await quickSortHelper(arr, low, pi - 1, bars);
        await quickSortHelper(arr, pi + 1, high, bars);
    }
}

async function partition(arr, low, high, bars) {
    var pivot = arr[high];
    var i = low - 1;

    bars[high].style.backgroundColor = "red";

    for (var j = low; j < high; j++) {
        bars[j].style.backgroundColor = "red";

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 100)
        );

        if (arr[j] < pivot) {
            i++;
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            swap(bars[i], bars[j]);

            bars[i].style.backgroundColor = "#007bff";
        } else {
            bars[j].style.backgroundColor = "#007bff";
        }
    }

    var temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    swap(bars[i + 1], bars[high]);

    bars[i + 1].style.backgroundColor = "green";

    return i + 1;
}