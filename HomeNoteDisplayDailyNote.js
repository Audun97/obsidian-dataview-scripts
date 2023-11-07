/**
 * This script is used to display daily notes for the current and previous day along with a link to them.
 * The daily note's file name should match the date in "YYYY-MM-DD" format
 */

// Import the moment library to handle dates
const today = moment().format("YYYY-MM-DD"); // Get today's date in "YYYY-MM-DD" format
const yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD"); // Get yesterday's date in "YYYY-MM-DD" format

// Use the dataview (dv) plugin's pages() function to find the note for today and yesterday
// The note's file name should match the date
const todayNote = dv.pages().where(p => p.file.name === today).first(); 
const yesterdayNote = dv.pages().where(p => p.file.name === yesterday).first(); 

// Initialize an empty array to store the table data
let tableData = []; 

// If a note for today exists
if (todayNote) { 
	// Load the content of the note
	let content = await dv.io.load(todayNote.file.path); 
	// Remove all headings (lines starting with '#') from the content
	content = content.replace(/^#.*$/gm, ''); 
	// Add a row to the table data with the note's link and the content
	tableData.push([todayNote.file.link, content]); 
} else { 
	// If no note for today exists, add a row indicating this
	tableData.push(["No note found for today.", ""]);
} 

// Repeat the same process for yesterday's note
if (yesterdayNote) { 
	let content = await dv.io.load(yesterdayNote.file.path); 
	content = content.replace(/^#.*$/gm, ''); 
	tableData.push([yesterdayNote.file.link, content]); 
} else { 
	tableData.push(["No note found for yesterday.", ""]); 
}

// Use the dataview (dv) plugin's table() function to display the table data
dv.table(["", ""], tableData);