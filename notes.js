const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('new note added') 
    } else {
        console.log('note title taken')
    }

    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title !== title)
    if(newNotes.length < notes.length) {
        saveNotes(newNotes)
        console.log(chalk.bgGreen('note removed'))
    } else {
        console.log(chalk.bgRed('note does not exist'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.blue('Your Notes: '))
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const requiredNote = notes.find((note) => note.title === title)

    if(!requiredNote) {
        console.log(chalk.red('No such note'))
    } else {
        console.log(chalk.bold.blue(requiredNote.title))
        console.log(requiredNote.body)
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
    

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}