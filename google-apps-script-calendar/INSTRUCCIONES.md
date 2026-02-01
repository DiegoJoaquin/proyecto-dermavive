# Configurar integración con Google Calendar

Para que las citas se agreguen **automáticamente** a tu Google Calendar cuando alguien reserve desde la web:

## Pasos

1. **Abre Google Apps Script**
   - Ve a [script.google.com](https://script.google.com)
   - Inicia sesión con la cuenta de Google de la clínica (la que tiene el calendario)

2. **Crea un nuevo proyecto**
   - Clic en "Nuevo proyecto"
   - Borra el código que aparece y pega el contenido de `Code.gs`

3. **Configura el calendario** (opcional)
   - Por defecto usa tu calendario principal
   - Si quieres usar otro, cambia la línea: `CalendarApp.getDefaultCalendar()` por `CalendarApp.getCalendarsByName('Nombre de tu calendario')[0]`

4. **Despliega la aplicación**
   - Menú: **Implementar** > **Nueva implementación**
   - Tipo: **Aplicación web**
   - Descripción: "Agendar citas Dermavive"
   - **Ejecutar como**: Yo (tu correo)
   - **Quién puede acceder**: Cualquier persona
   - Clic en **Implementar**
   - Autoriza los permisos si te lo pide (Calendar, etc.)

5. **Copia la URL**
   - Se generará una URL como: `https://script.google.com/macros/s/AKfycbxxxxxxxxx/exec`
   - Cópiala

6. **Pega la URL en tu web**
   - Abre `index.html`
   - Busca la línea: `const GOOGLE_CALENDAR_SCRIPT_URL = '';`
   - Pega la URL entre las comillas: `const GOOGLE_CALENDAR_SCRIPT_URL = 'https://script.google.com/...';`

## Listo

Ahora, cuando alguien complete el formulario de reserva con fecha, hora, nombre y teléfono, la cita se creará automáticamente en tu Google Calendar.

## Sin configurar el script

Si no configuras la URL, el formulario abrirá Google Calendar con los datos ya completados para que el usuario (o tú) pueda guardar la cita manualmente con un clic.
