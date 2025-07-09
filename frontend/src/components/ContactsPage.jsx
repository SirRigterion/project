import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Box, Container, Typography, TextField, Button, CircularProgress } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios";

const ContactsPage = ({ mode = "light" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project_description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Имя обязательно";
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Неверный формат email. Правильный example@mail.com";
    }
    if (!formData.project_description.trim()) newErrors.project_description = "Описание проекта обязательно";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Фокусируемся на первом поле с ошибкой
      if (validationErrors.name) nameRef.current.focus();
      else if (validationErrors.email) emailRef.current.focus();
      else if (validationErrors.project_description) descriptionRef.current.focus();
      return;
    }

    setLoading(true);
    try {
      await axios.post("/mail/send", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess("Заказ отправлен! Мы свяжемся с вами.");
      setFormData({ name: "", email: "", project_description: "" });
    } catch (err) {
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.detail.reduce((acc, error) => ({
          ...acc,
          [error.loc[1]]: error.msg,
        }), {});
        setErrors(validationErrors);
      } else {
        setErrors({ general: "Ошибка при отправке. Попробуйте снова." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="contacts"
      className="contacts-page"
      sx={{
        minHeight: "100vh",
        background: mode === "dark"
          ? "linear-gradient(135deg, var(--bg-contacts), #1e1e2f 100%)"
          : "linear-gradient(135deg, var(--bg-contacts), #e2e8f0 100%)",
        paddingTop: { xs: "80px", sm: "100px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: mode === "dark"
            ? "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.1), transparent 70%)"
            : "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.15), transparent 70%)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" className="container"
         sx={{ zIndex: 1,
             px: { xs: 1, sm: 2, md: 4 },
          }}
      >
        <Typography
          variant="h2"
          component="h2"
          className="contacts-page-title"
          sx={{
            color: mode === "dark" ? "var(--text-light)" : "var(--text-dark)",
            textAlign: "center",
            mb: { xs: 4, sm: 6 },
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 800,
            letterSpacing: "-0.02em",
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "60px",
              height: "4px",
              background: "linear-gradient(90deg, var(--primary), var(--secondary))",
              margin: "1rem auto 0",
              borderRadius: "2px",
            },
          }}
        >
          Свяжитесь с нами
        </Typography>
        <Box
          className="contacts-container"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 1, sm: 2, md: 4 },
            p: { xs: 1, sm: 2, md: 4 },
            background: mode === "dark"
              ? "rgba(45, 55, 72, 0.85)"
              : "rgba(255, 255, 255, 0.85)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-md)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="contacts-info"
            sx={{
              padding: { xs: 2, sm: 3 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                color: mode === "dark" ? "var(--text-light)" : "var(--text-dark)",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Контактная информация
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <EmailIcon
                sx={{
                  color: "var(--primary)",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "var(--text-medium)",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Email:{" "}
                <a
                  href="mailto:itsolutionsworktech@gmail.com"
                  style={{
                    color: "var(--primary)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "var(--primary-dark)")}
                  onMouseOut={(e) => (e.target.style.color = "var(--primary)")}
                >
                  itsolutionsworktech@gmail.com
                </a>
              </Typography>
            </Box>
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <PhoneIcon
                sx={{
                  color: "var(--primary)",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "var(--text-medium)",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Телефон:{" "}
                <a
                  href="tel:+79991234567"
                  style={{
                    color: "var(--primary)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "var(--primary-dark)")}
                  onMouseOut={(e) => (e.target.style.color = "var(--primary)")}
                >
                  +7 (999) 123-45-67
                </a>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <LocationOnIcon
                sx={{
                  color: "var(--primary)",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "var(--text-medium)",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Адрес: г. Москва, ул. Примерная, д. 1
              </Typography>
            </Box> */}
          </div>
          <div
            className="contacts-form"
            sx={{
              padding: { xs: 2, sm: 3 },
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                color: mode === "dark" ? "var(--text-light)" : "var(--text-dark)",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Форма заказа
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'var(--text-medium)',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                mb: 1.5,
              }}
            >
              Напоминаем что мы собераем данные согласно нашей политике ознакомтись с ней ниже, до ввода и отправки данных.
            </Typography>
            <Box
              component="form"
              className="form-group"
              noValidate
              autoComplete="off"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              aria-label="Форма заказа услуг"
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                label="Ваше имя"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                className="contacts-form-input"
                error={!!errors.name}
                helperText={errors.name}
                required
                inputRef={nameRef}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    transition: "all 0.3s ease",
                    "&:hover fieldset": { borderColor: "var(--primary)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--primary)",
                      boxShadow: "0 0 8px rgba(99, 102, 241, 0.3)",
                    },
                    "& .MuiInputBase-input": {
                      color: mode === "dark" ? "var(--text-light)" : "var(--text-dark)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--text-medium)",
                    "&.Mui-focused": { color: "var(--primary)" },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Ваш email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                className="contacts-form-input"
                error={!!errors.email}
                helperText={errors.email}
                required
                inputRef={emailRef}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    transition: "all 0.3s ease",
                    "&:hover fieldset": { borderColor: "var(--primary)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--primary)",
                      boxShadow: "0 0 8px rgba(99, 102, 241, 0.3)",
                    },
                    "& .MuiInputBase-input": {
                      color: mode === "dark" ? "var(--text-light)" : "var(--text-dark)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--text-medium)",
                    "&.Mui-focused": { color: "var(--primary)" },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Описание проекта"
                name="project_description"
                multiline
                rows={4}
                value={formData.project_description}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                className="contacts-form-textarea"
                error={!!errors.project_description}
                helperText={errors.project_description}
                required
                inputRef={descriptionRef}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    transition: "all 0.3s ease",
                    "&:hover fieldset": { borderColor: "var(--primary)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--primary)",
                      boxShadow: "0 0 8px rgba(99, 102, 241, 0.3)",
                    },
                    "& .MuiInputBase-input": {
                      color: mode === "dark" ? "var(--text-light)" : "var(--text-dark)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--text-medium)",
                    "&.Mui-focused": { color: "var(--primary)" },
                  },
                }}
              />
              {errors.general && (
                <Typography color="error" sx={{ fontSize: "0.875rem" }}>
                  {errors.general}
                </Typography>
              )}
              {success && (
                <Typography color="success.main" sx={{ fontSize: "0.875rem" }}>
                  {success}
                </Typography>
              )}
              <Button
                variant="contained"
                type="submit"
                className="contacts-form-button"
                aria-label="Отправить форму заказа"
                disabled={loading}
                sx={{
                  mt: 2,
                  background: "linear-gradient(90deg, var(--primary), var(--secondary))",
                  color: "#fff",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  padding: { xs: "10px 20px", sm: "12px 24px" },
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(90deg, var(--secondary), var(--primary))",
                    boxShadow: "var(--shadow-md)",
                  },
                  "&:disabled": { background: "#9ca3af" },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Отправить"}
              </Button>
            </Box>
          </div>
        </Box>
      </Container>
    </motion.section>
  );
};

export default ContactsPage;