"""first

Revision ID: de81edc4899e
Revises: 
Create Date: 2024-05-24 19:50:56.864768

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'de81edc4899e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recogs',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('result', sa.String(length=20), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recogs')
    # ### end Alembic commands ###
