// Handlers popup task
const popup = url => {
  window.open(url, '_blank', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=600')
}

/// On DOM ready
$(document).ready(() => {
  // Adds 🔍 on list issues
  $('table.issues tr.issue td.subject a').each((i, item) => {
    const url = $(item).attr('href') + '?tab=history'
    $(item).parent().prepend("<span class='popupIssue' linko=" + url + '> 🔍 </span>')
  })

  // Adds 🔍 on agile board cards
  $(' div.issue-card span.fields p.issue-id strong').each((i, item) => {
    const url = $(item).parent().siblings('p.name').children('a').attr('href') + '?tab=history'

    $(item).prepend("<span class='popupIssue' linko=" + url + '> 🔍 </span>')
  })

  // Adds 🔍 to rows on time entries
  $('table.time-entries td.issue a').each((i, item) => {
    const url = $(item).attr('href') + '?tab=history'
    $(item).parent().prepend("<span class='popupIssue' linko=" + url + '> 🔍 </span>')
  })

  $('.popupIssue').on('click', item => {
    const url = item.target.attributes.linko.value
    popup(url)
  })

  // Adds pictos to show priority on issues
  $('table.issues tr.issue').each((i, item) => {
    if ($(item).hasClass('priority-1')) {
      const col_priority = $(item).children('.priority')
      $(col_priority).prepend(' 🔵 ')
    }

    if ($(item).hasClass('priority-2')) {
      const col_priority = $(item).children('.priority')
      $(col_priority).prepend(' 🟢 ')
    }

    if ($(item).hasClass('priority-3')) {
      const col_priority = $(item).children('.priority')
      $(col_priority).prepend(' 🟡 ')
    }

    if ($(item).hasClass('priority-4')) {
      const col_priority = $(item).children('.priority')
      $(col_priority).prepend(' 🟠 ')
    }

    if ($(item).hasClass('priority-5')) {
      const col_priority = $(item).children('.priority')
      $(col_priority).prepend(' 🔴 ')
    }
  })
})
