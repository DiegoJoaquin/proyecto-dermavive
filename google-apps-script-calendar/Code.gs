/**
 * Dermavive - Agregar citas a Google Calendar automáticamente
 * 
 * INSTRUCCIONES:
 * 1. Ve a script.google.com
 * 2. Crea un nuevo proyecto
 * 3. Pega este código
 * 4. En la línea 17, cambia 'primary' por el nombre de tu calendario si usas otro
 * 5. Archivo > Desplegar > Nueva implementación > Tipo: Aplicación web
 * 6. Ejecutar como: Yo
 * 7. Quién puede acceder: Cualquier persona
 * 8. Desplegar y copia la URL
 * 9. Pega la URL en index.html en la variable GOOGLE_CALENDAR_SCRIPT_URL
 */

function doPost(e) {
  try {
    const params = e.parameter;
    const name = params.name || 'Sin nombre';
    const phone = params.phone || '';
    const treatment = params.treatment || 'Consulta';
    const dateStr = params.date;
    const timeStr = params.time;
    
    if (!dateStr || !timeStr) {
      return createResponse({ success: false, error: 'Faltan fecha u hora' }, 400);
    }
    
    // Crear objeto Date (formato: YYYY-MM-DD, HH:MM)
    const startDate = new Date(dateStr + 'T' + timeStr + ':00');
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hora
    
    // Usar calendario primario. Para otro: CalendarApp.getCalendarsByName('Nombre')[0]
    const calendar = CalendarApp.getDefaultCalendar();
    
    const title = 'Cita Dermavive - ' + treatment;
    const description = 'Paciente: ' + name + '\nTeléfono/WhatsApp: ' + phone + '\nTratamiento: ' + treatment;
    
    calendar.createEvent(title, startDate, endDate, {
      description: description,
      location: 'Ohiggins 65, Concepción'
    });
    
    return createResponse({
      success: true,
      message: 'Cita agendada correctamente en Google Calendar'
    });
    
  } catch (err) {
    return createResponse({
      success: false,
      error: err.toString()
    }, 500);
  }
}

function createResponse(obj, statusCode) {
  statusCode = statusCode || 200;
  
  // Si fue exitoso, devolver HTML que notifica a la página padre
  if (obj.success && statusCode === 200) {
    const html = '<html><head><meta charset="utf-8"></head><body><script>window.parent.postMessage({type:"booking_success"}, "*");</script>Cita agendada correctamente.</body></html>';
    return ContentService.createTextOutput(html).setMimeType(ContentService.MimeType.HTML);
  }
  
  // Si hubo error, devolver JSON
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
