# 🧯 ExtintoresPRO - Sistema de Control de Extintores

Sistema completo de gestión y control de extintores para **CD Esteban Echeverría**.

## 🚀 Características

- ✅ **Dashboard Web** - Gestión completa desde PC/Tablet
- ✅ **QR Scanner** - Escaneo y edición desde móvil
- ✅ **Google Sheets** - Sincronización en tiempo real
- ✅ **Google Drive** - Almacenamiento de fotos con subcarpetas
- ✅ **PWA** - Instalable como app nativa
- ✅ **Offline** - Funciona sin conexión
- ✅ **Actualizaciones automáticas** - Sin reinstalar

---

## 📱 Acceso Rápido

### **Dashboard (PC/Tablet):**
```
https://TU-USUARIO.github.io/control-extintores-cdee/
```

### **QR Scanner (Móvil):**
```
https://TU-USUARIO.github.io/control-extintores-cdee/scanner.html
```

---

## 🔗 Configuración

### **Google Sheets:**
```
ID: 1B7KIT5KaqsVBFyTxF6EGHdpcAuvtwABxhhCgkdyC2xE
```

### **Google Drive:**
```
ID: 17GNClHzTkokZma0sQZbk6LQkB3ro-fKP
```

### **Apps Script:**
```
URL: https://script.google.com/macros/s/AKfycbxp5HEt6JLKsv75Mm_hO4BXfzjDAoORfLiafYG6yZByRsFne4x10X7rcR_cNCsCFjit/exec
Versión: 47
```

---

## 📊 Hojas de Google Sheets

- `CONTROL_EXTINTORES_CDEE` - Extintores principales
- `EXTINTORES_MAQUINAS` - Extintores de maquinaria
- `EXTINTORES_RESERVA` - Stock de reserva
- `TANQUES_AIRE_BRIGADA` - Tanques de aire
- `EXTINTORES_DE_BAJA` - Extintores dados de baja
- `USUARIOS` - Control de acceso

---

## 🛠️ Tecnologías

- HTML5 + JavaScript (Vanilla)
- TailwindCSS (vía CDN)
- Google Apps Script (Backend)
- Google Sheets API
- Google Drive API
- Service Worker (PWA)
- Chart.js (Gráficos)

---

## 📦 Instalación como PWA

### **Android:**
1. Abrir dashboard en Chrome
2. Menú → "Agregar a pantalla de inicio"
3. Listo - Aparece ícono en pantalla

### **iOS:**
1. Abrir dashboard en Safari
2. Compartir → "Agregar a pantalla de inicio"
3. Listo - Aparece ícono en pantalla

### **PC (Chrome/Edge):**
1. Abrir dashboard
2. Barra de direcciones → Ícono de instalación
3. Click en "Instalar"

---

## 🔄 Actualizaciones

Las actualizaciones se aplican **automáticamente**:

1. Desarrollador sube cambios a GitHub
2. GitHub Pages actualiza (1-2 minutos)
3. Service Worker detecta cambios (hasta 1 hora)
4. Usuario recibe notificación
5. Usuario recarga → ✅ Actualizado

**Todos los usuarios reciben actualizaciones sin reinstalar.**

---

## 👥 Usuarios

Los usuarios se gestionan desde la hoja `USUARIOS` en Google Sheets:

```
Columnas: NOMBRE | CLAVE | ROL
```

**Roles disponibles:**
- `ADMIN` - Acceso total
- `SUPERVISOR` - Gestión y reportes
- `USUARIO` - Uso básico

Para agregar usuario:
1. Editar hoja USUARIOS en Google Sheets
2. Agregar nueva fila con datos
3. Guardar
4. ✅ Usuario puede iniciar sesión

---

## 🧪 Testing

### **Verificar Apps Script:**
```
https://script.google.com/macros/s/AKfycbxp5HEt6JLKsv75Mm_hO4BXfzjDAoORfLiafYG6yZByRsFne4x10X7rcR_cNCsCFjit/exec?sheet=_ping
```

Debe retornar:
```json
{
  "success": true,
  "message": "ExtintoresPRO API funcionando"
}
```

### **Verificar Dashboard:**
1. Abrir en navegador
2. F12 → Console
3. `CONFIG.apiUrl` debe mostrar URL del Apps Script
4. Debe cargar datos de Google Sheets

### **Verificar Scanner:**
1. Abrir scanner.html
2. Testigos deben estar en verde:
   - API ✓
   - SHEETS ✓
   - DRIVE ✓

---

## 📝 Changelog

### **v1.0 - 16 Mar 2026**
- ✅ Dashboard completo
- ✅ QR Scanner funcional
- ✅ Integración con Google Sheets
- ✅ Subida de fotos a Drive
- ✅ PWA con Service Worker
- ✅ Actualizaciones automáticas
- ✅ Soporte offline

---

## 📄 Licencia

Uso interno de CD Esteban Echeverría.

---

## 🆘 Soporte

Para problemas o consultas, contactar al administrador del sistema.

---

## 🔗 Enlaces Útiles

- [Google Sheets](https://docs.google.com/spreadsheets/d/1B7KIT5KaqsVBFyTxF6EGHdpcAuvtwABxhhCgkdyC2xE/edit)
- [Apps Script](https://script.google.com/)
- [Google Drive](https://drive.google.com/drive/folders/17GNClHzTkokZma0sQZbk6LQkB3ro-fKP)

---

**Sistema desarrollado para CD Esteban Echeverría - 2026**
