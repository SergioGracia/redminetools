// Handlers popup task
const popup = url => {
  const x = screen.width / 2 - 800 / 2
  const y = screen.height / 2 - 600 / 2
  window.open(url, '_blank', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes,height=600,width=800,left=' + x + ',top=' + y)
}

const popup2 = url => {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', url, false) // false for synchronous request
  xmlHttp.send(null)

  const popup = '<div class="popupWrapper" id="popupWrapper"><div class="popupIssue">  ' + xmlHttp.responseText + '   </div></div>'

  // console.log($(xmlHttp.responseText).html())

  $(popup).prependTo('body')
}

const escFunction = e => {
  if (e.keyCode === 27) {
    const elem = document.getElementById('popupWrapper')
    if (elem.parentNode) {
      $(elem).fadeOut('fast', () => {
        elem.parentNode.removeChild(elem)
      })
    }
  }
}

/// On DOM ready
$(document).ready(() => {
  // popup2('/issue/1934')

  // ESC handler to close popup if opened
  document.addEventListener('keydown', escFunction, false)

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
    popup2(url)
  })

  // New jquery modal test
  // $('.popupIssue').click(function (event) {
  //   event.preventDefault()
  //   this.blur() // Manually remove focus from clicked link.
  //   $.ajax(event.target.attributes.linko.value, function (html) {
  //     $(html).appendTo('body').modal()
  //   })
  // })

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

  // Ads pictos to some statuses
  $('table.issues tr.issue').each((i, item) => {
    if ($(item).hasClass('status-5')) {
      const col_priority = $(item).children('.status')
      $(col_priority).prepend(' ✔ ')
    } else {
      const col_priority = $(item).children('.status')
      $(col_priority).prepend(' ⬜ ')
    }
  })
})
