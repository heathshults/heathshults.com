
document.addEventListener('DOMContentLoaded', function () {
  const EZForm = function (ezselector) {
    
    $(ezselector).validate({
      rules: {
        name: 'required',
        message: 'required',
        optin: 'required',
        email: {
          required: true,
          // Specify that email should be validated
          // by the built-in "email" rule
          email: true
        }
      },
      messages: {
        name: 'Please enter your name',
        message: 'A message is required.',
        optin: 'Opt-in for updates via email.',
        email: 'A valid email address is required.'
      },
      
      submitHandler: function (ezselector) {

        // the form
        const $theForm = $(ezselector)
        const $formtype = $theForm.attr('data-formtype')
        let ezsystemfields = $('#systemfields')

        // form data
        let jqXHR = () => {}
        let resetForm = () => {}
        
        let $formFields = $theForm.find('input, select, textarea')
        let apiurl = 'http://127.0.0.1:3000/api/ezform.php'
        // const apiurl = 'http://blueprint.fanniemae.com:9306/api/ezform.php'

        // form messaging
        let formError = () => {}
        let formSuccess = () => {}
        let getStatusMsg = () => {}
        const $messageBox = $('#msgSubmit')
        const successIcon = '<svg version="1.1" class="bp-ucon-inject" xmlns="http=//www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.748 6.398l-1.601-1.601a.754.754 0 0 0-1.067 0l-9.596 9.596-4.565-4.597a.754.754 0 0 0-1.067 0l-1.6 1.601a.754.754 0 0 0 0 1.067l6.693 6.738a.754.754 0 0 0 1.067 0L21.748 7.465a.754.754 0 0 0 0-1.067z"></path></g></svg>'
        const errorIcon = '<svg version="1.1" class="bp-ucon-inject" xmlns="http=//www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31A7.902 7.902 0 0 1 12 20zm6.31-3.1L7.1 5.69A7.902 7.902 0 0 1 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"></path></g></svg>'
        let successMessage = null
        let errorMessage = null


        ezsystemfields = [
          {"name":"ezformtype", "value":$formtype},
          {"name":"ezdatecreated", "value":timestamper()}
        ]
        console.log(ezsystemfields)

        
        const datajson = $theForm.serializeArray()
        datajson.push({name:"ezformtype", "value":$formtype}, {"name":"ezformdate", "value":timestamper()})
        // let data = {...datajson, ...ezsystemfields}
        
        console.log(datajson)
        $('#systemfields').html(JSON.stringify(datajson))

        resetForm = () => {
          $theForm[0].reset()
        }

        // Disable the inputs for the duration of the Ajax jqXHR. Intentionaly placed after json.stringify
        // Disabled form elements will not be processed.
        $formFields.prop('disabled', true)

        getStatusMsg = (result) => {
          successMessage = `
                <div id="successDiv" class="bp-u-text-left bp-u-p-md">
                  <h2>${successIcon} Thank you!</h2> 
                  <p class="bp-u-text-size-lg">
                    We have received your message.<br>
                    A Blueprint expert will conatact you soon.
                  </p>
                </div>`

          errorMessage = `
                <div id="errorDiv" class="bp-u-text-left bp-u-p-md">
                  <h2>${errorIcon} ERROR! </h2>
                  <p>${'Error in form'}
                  </p>
                </div>`

          if (result === 1) {
            return successMessage
          }
          if (result === 0) {
            return errorMessage
          }
        }
        formSuccess = () => {
          $messageBox.html(getStatusMsg(1)).addClass('hs-message-box--blue is-visible')
          $theForm.addClass('bp-u-display-none')
          return resetForm()
        }

        formError = (e) => {
          $theForm.addClass('shake animated')
          $messageBox.html(`${getStatusMsg(0)},From server:<br>${e}`).addClass('hs-message-box--destructive is-visible')
        }

        jqXHR = $.post(apiurl, datajson, function () {
          // alert( "success" );

        })
          .done(function () {
            formSuccess()
          })
          .fail(function (error) {
            console.log('Error: ' + error);
            formError(error)
          })
          .always(function () {
          })

        // Perform other work here ...

        // Set another completion function for the request above
        jqXHR.always(function () {
          // alert( "always finished" );
          // Reenable the inputs
          $formFields.prop('disabled', false)
        })
      }
    })
  }
  
  let styles
  module.exports = styles = () => {
    const theStyleTag = document.createElement('style')
    theStyleTag.innerHTML = `
      .hs-message-box {
        padding: 0rem;
        text-align: left;
        width: 655px;
        height: -1px;
        overflow: hidden;
        margin-left: auto;
        margin-right: auto;
        -webkit-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
        -moz-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
          -o-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
              transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);

      -webkit-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
        -moz-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
          -o-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
              transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
      }
      .hs-message-box.is-visible {
        padding: 1.5rem;
        width: 650px;
        height: 250px;
        overflow-y: auto;
        -webkit-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
        -moz-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
          -o-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
              transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);

      -webkit-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
        -moz-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
          -o-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
              transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
      }
      .hs-message-box--destructive {
        background: rgba(156, 32, 32, 0.2);
        color: rgba(156, 32, 32, 1);
        border: 2px solid rgba(156, 32, 32, 0.6)
      }
      .hs-message-box--green {
        background: rgba(35, 129, 150, .2);
        color: rgba(35, 129, 150, 1);
        border: 2px solid rgba(35, 129, 150, 0.6);
      }
      .hs-message-bo--blue {
        background: rgba(10, 101, 157, 0.2);
        color: rgba(10, 101, 157, 1);
        border: 2px solid rgba(10, 101, 157, 0.6);
      }
      .bp-form-item  .bp-button.bp-button-primary.hs-restart-button.hs-restart-button {
        display: none !important;
      }
      .bp-form-item .bp-button.bp-button-primary.hs-restart-button.hs-restart-button.is-visible {
        display: inline-block;
      }

      `
    const $theHeadTag = $('HEAD')
    $theHeadTag.append(theStyleTag)
  }
  styles()


  module.exports = function timestamper() {
    var dt = new Date()

    // ensure date comes as 01, 09 etc
    var DD = ('0' + dt.getDate()).slice(-2)

    // getMonth returns month from 0
    var MM = ('0' + (dt.getMonth() + 1)).slice(-2)
    var YYYY = dt.getFullYear()
    var hh = ('0' + dt.getHours()).slice(-2)
    var mm = ('0' + dt.getMinutes()).slice(-2)
    var ss = ('0' + dt.getSeconds()).slice(-2)
    var date_string = YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss

    return date_string
  }
  EZForm('#ezform1')
})
