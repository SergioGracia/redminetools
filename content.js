// Handlers popup task
const popup = url => {
  window.open(url, '_blank', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=600')
}

/// On DOM ready
$(document).ready(() => {
  // Adds 🔍 on list issues
  $('table.issues tr.issue td.subject a').each((i, item) => {
    const url = $(item).attr('href')
    $(item).parent().prepend("<span class='popupIssue' linko=" + url + '> 🔍 </span>')
  })

  // Adds 🔍 on agile board cards
  $(' div.issue-card span.fields p.issue-id strong').each((i, item) => {
    const url = $(item).parent().siblings('p.name').children('a').attr('href')

    $(item).prepend("<span class='popupIssue' linko=" + url + '> 🔍 </span>')
  })

  // Adds 🔍 to rows on time entries
  $('table.time-entries td.issue a').each((i, item) => {
    const url = $(item).attr('href')
    $(item).parent().prepend("<span class='popupIssue' linko=" + url + '> 🔍 </span>')
  })

  $('.popupIssue').on('click', item => {
    const url = item.target.attributes.linko.value
    popup(url)
  })
})
