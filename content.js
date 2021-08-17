// Adds a magnifier glass next to the link in the issues table to open in a new popup window instead the current one
const popup = url => {
  window.open(url, '_blank', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=600')
}

$(document).ready(() => {
  $('table.issues tr.issue td.subject a').each((i, item) => {
    const url = $(item).attr('href')
    $(item).parent().append("<span class='popupIssue' linko=" + url + '> 🔍 </span>')
  })

  $('.popupIssue').on('click', item => {
    const url = item.target.attributes.linko.value
    popup(url)
  })
})
