import subprocess
import os
import tkinter as tk
from tkinter import messagebox, scrolledtext
import logging
import threading

FRONTEND_PATH = r'm:\SS_SENTINNELL_WOK_FONTE\SENTINNELLIAWORKSPACE\src'
BACKEND_PATH = r'm:\SS_SENTINNELL_WOK_FONTE\SENTINNELLIAWORKSPACE\backend'

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('server_manager.log'),
        logging.StreamHandler()
    ]
)

class CustomLogger:
    def __init__(self, text_widget):
        if not isinstance(text_widget, scrolledtext.ScrolledText):
            raise ValueError("text_widget must be an instance of scrolledtext.ScrolledText")
        self.text_widget = text_widget

    def write(self, message):
        self.text_widget.insert(tk.END, message)
        self.text_widget.see(tk.END)
        logging.info(message.strip())

    def flush(self):
        pass

def run_command(command, cwd=None, logger=None, status_label=None):
    def target():
        try:
            if cwd and not os.path.exists(cwd):
                raise FileNotFoundError(f"Directory '{cwd}' not found.")
            full_command = f'cd /d {cwd} && {command}' if cwd else command
            logger.write(f"Executando: {full_command}\n")
            # Open a new terminal window to run the command
            process = subprocess.Popen(f'start cmd /k "{full_command}"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            status_label.config(text="Status: Executando", fg="green")
            while True:
                output = process.stdout.readline()
                if output == '' and process.poll() is not None:
                    break
                if output:
                    logger.write(output)
            rc = process.poll()
            if rc == 0:
                logger.write("Executado\n")
            else:
                logger.write(f"Erro: {process.stderr.read()}\n")
                status_label.config(text="Status: Erro", fg="red")
        except Exception as e:
            logger.write(f"Erro: {e}\n")
            status_label.config(text="Status: Erro", fg="red")
    
    thread = threading.Thread(target=target)
    thread.start()

def install_frontend_dependencies(logger, status_label):
    logger.write("Executando: Instalando dependências do frontend...\n")
    run_command("npm install", cwd=FRONTEND_PATH, logger=logger, status_label=status_label)

def update_frontend_dependencies(logger, status_label):
    logger.write("Executando: Atualizando dependências do frontend...\n")
    run_command("npm update", cwd=FRONTEND_PATH, logger=logger, status_label=status_label)

def fix_npm_vulnerabilities(logger, status_label):
    logger.write("Executando: Corrigindo vulnerabilidades do npm...\n")
    run_command("npm audit fix --force", cwd=FRONTEND_PATH, logger=logger, status_label=status_label)

def install_backend_dependencies(logger, status_label):
    logger.write("Executando: Instalando dependências do backend...\n")
    requirements_path = os.path.join(BACKEND_PATH, 'requirements.txt')
    if os.path.exists(requirements_path):
        run_command("pip install -r requirements.txt", cwd=BACKEND_PATH, logger=logger, status_label=status_label)
    else:
        logger.write(f"Erro: Arquivo de requisitos não encontrado: '{requirements_path}'\n")
        messagebox.showerror("Erro", f"Arquivo de requisitos não encontrado: '{requirements_path}'")
        status_label.config(text="Status: Erro", fg="red")

def install_backend_node_dependencies(logger, status_label):
    logger.write("Executando: Instalando dependências Node.js do backend...\n")
    run_command("npm install", cwd=BACKEND_PATH, logger=logger, status_label=status_label)

def update_backend_dependencies(logger, status_label):
    logger.write("Executando: Atualizando dependências do backend...\n")
    requirements_path = os.path.join(BACKEND_PATH, 'requirements.txt')
    run_command(f"pip install --upgrade -r {requirements_path}", cwd=BACKEND_PATH, logger=logger, status_label=status_label)

def fix_backend_vulnerabilities(logger, status_label):
    logger.write("Executando: Corrigindo vulnerabilidades do backend...\n")
    run_command("safety check --full-report", cwd=BACKEND_PATH, logger=logger, status_label=status_label)

def build_backend(logger, status_label):
    logger.write("Executando: Construindo backend...\n")
    run_command("python app.py", cwd=BACKEND_PATH, logger=logger, status_label=status_label)  # Ensure 'app.py' is the correct entry point

def build_frontend(logger, status_label):
    logger.write("Executando: Construindo frontend...\n")
    run_command("npm run build", cwd=FRONTEND_PATH, logger=logger, status_label=status_label)

def start_frontend(logger, status_label):
    logger.write("Executando: Iniciando frontend...\n")
    run_command("npm start", cwd=FRONTEND_PATH, logger=logger, status_label=status_label)

def start_backend(logger, status_label):
    logger.write("Executando: Iniciando backend...\n")
    run_command("node server.js", cwd=BACKEND_PATH, logger=logger, status_label=status_label)

def create_server_frame(root, server_name, install_func, update_func, fix_func, build_func, start_func):
    frame = tk.Frame(root, padx=10, pady=10, relief=tk.RAISED, borderwidth=2)
    frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

    label = tk.Label(frame, text=server_name, font=("Arial", 16))
    label.pack(pady=10)

    log_text = scrolledtext.ScrolledText(frame, wrap=tk.WORD, height=10)
    log_text.pack(pady=5, fill=tk.BOTH, expand=True)

    logger = CustomLogger(log_text)

    status_label = tk.Label(frame, text="Status: Parado", font=("Arial", 12), fg="red")
    status_label.pack(pady=10)

    install_button = tk.Button(frame, text="Instalar Dependências", command=lambda: install_func(logger, status_label))
    install_button.pack(pady=5)

    update_button = tk.Button(frame, text="Atualizar Dependências", command=lambda: update_func(logger, status_label))
    update_button.pack(pady=5)

    fix_button = tk.Button(frame, text="Corrigir Vulnerabilidades", command=lambda: fix_func(logger, status_label))
    fix_button.pack(pady=5)

    build_button = tk.Button(frame, text="Construir", command=lambda: build_func(logger, status_label))
    build_button.pack(pady=5)

    start_button = tk.Button(frame, text="Iniciar", command=lambda: start_func(logger, status_label))
    start_button.pack(pady=5)

    return status_label

def noop(logger, status_label):
    pass

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    logging.debug("Changed working directory to script location")

    root = tk.Tk()
    root.title("Server Manager")

    frontend_status = create_server_frame(
        root, "Servidor Frontend",
        install_frontend_dependencies,
        update_frontend_dependencies,
        fix_npm_vulnerabilities,
        build_frontend,
        start_frontend
    )

    backend_status = create_server_frame(
        root, "Servidor Backend",
        install_backend_dependencies,
        install_backend_node_dependencies,
        noop,  # No fix function for backend
        noop,  # No build function for backend
        start_backend
    )

    root.mainloop()

if __name__ == "__main__":
    main()
