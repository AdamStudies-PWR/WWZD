import plotly.express as px


def display_plot(df, metadata_present=False):
    fig = None
    if metadata_present:
        fig = px.scatter(df, x='x', y='y', color="label", hover_data={"title", "date"})
    else:
        fig = px.scatter(df, x='x', y='y')

    fig.show()
