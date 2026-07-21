import tkinter as tk

screen = tk.Tk()
screen.geometry("900x900")
screen.config(bg="red")

label = tk.Label(screen, text="Bonjour Patrick et christinah")
label.pack()

btn = tk.Button(screen, text="Je suis Button", bg="yellow", fg="blue")
btn.pack()
tk.Label(screen, text="Bonjour Nomentsoa ").pack()

screen.mainloop()
